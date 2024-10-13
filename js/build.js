$(function() {
    $('body').buildForm();
    $('.dropdown-submenu a.dropdown-toggle-submenu').click(function(e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
    $.extend(true, $.fn.dataTable.defaults, {
        initComplete : function() {
            $('[data-toggle="tooltip"]', this).tooltip();
        }
    });
    $('#filter').buildFilter();

	$('.card-header').each(function() {
		$(this).append('<span class="pull-right"><i class="fa fa-angle-down"></i></span>');
	});

});

$.fn.tableSeq = function() {
    var no = 1;
    $('tbody tr.table-seq-row', this).each(function(key, elem) {
        $('[data-m="seq"]', elem).html(no);
        no++;
    });
};

$.fn.buildForm = function() {
    //$.fn.modal.Constructor.prototype._enforceFocus = function() {};
    $.each(this, function(key, elem) {
        $('[required], .required', elem).each(function(key, elem) {
            if (!$('label > span', $(elem).closest('.form-group')).length > 0) {
                $('label', $(elem).closest('.form-group')).append(' <span class="text-danger">*</span>');
            }
        });

        $('[data-input-type="select2"]', elem).each(function(key, elem) {
            var containerCssClass = '';
            if ($(elem).hasClass('form-control-sm')) {
                containerCssClass = 'select2-sm';
            }
            if ($(elem).parents('.dataTables_filter').length == 0) {
                $(elem).css('width', '100%');
            }
            if ($(elem).parents('.bootbox.modal').length == 1) {
                $(elem).select2({
                    dropdownParent: $('.bootbox.modal'),
                    containerCssClass: containerCssClass,
                    dropdownAutoWidth: true
                });
            } else if ($(elem).parents('.modal').length == 1) {
                $(elem).select2({
                    dropdownParent: $('.modal'),
                    containerCssClass: containerCssClass,
                    dropdownAutoWidth: true
                });
            } else {
                $(elem).select2({
                    containerCssClass: containerCssClass,
                    dropdownAutoWidth: true
                });
            }
        });

        $('[data-input-type="number-format"]', elem).each(function(key, elem) {
            var thousand_separator = bahasa['thousand_separator'];
            if ($(elem).data('thousand-separator') != undefined) {
                if ($(elem).data('thousand-separator') == false) {
                    thousand_separator = '';
                } else {
                    thousand_separator = $(elem).data('thousand-separator');
                    if (thousand_separator === true) {
                        thousand_separator = bahasa['thousand_separator'];
                    }
                }
            }
            var decimal_separator = bahasa['decimal_separator'];
            if ($(elem).data('decimal-separator') != undefined) {
                if ($(elem).data('decimal-separator') == false) {
                    decimal_separator = false;
                } else {
                    decimal_separator = $(elem).data('decimal-separator');
                    if (decimal_separator === true) {
                        decimal_separator = bahasa['decimal_separator'];
                    }
                }
            }
            var precision = 2;
            if ($(elem).data('precision') != undefined ) {
                precision = parseInt($(elem).data('precision'));
            }
            //$(elem).number(true, precision, decimal_separator, thousand_separator);
            $(elem).autoNumeric('init', {
                aSep: thousand_separator,
                aDec: decimal_separator,
                mDec: precision,
                vMin: '-999999999999999.99',
                vMax: '999999999999999.99'
            });
        });

        $('[data-input-type="datepicker"]', elem).each(function(key, elem) {
            if ($(elem).data('end-date')) {
                var endDate = new Date($(elem).data('end-date'));
            } else {
                var endDate = false;
            }

            $(elem).datepicker({
                format : bahasa['datepicker_format'],
                endDate : endDate,
                enableOnReadonly : false,
                closeOnDateSelect: true
            }).on('change', function() {
                $(elem).datepicker('hide');
            });
        });

        $('[data-input-type="timepicker"]', elem).each(function(key, elem) {
            $(elem).timepicker({
                showMeridian: false
            });
        });

        $('[data-input-type="file"]', elem).each(function(key, elem) {
            $('.btn-browse', elem).click(function() {
                $('input[type="file"]', elem).trigger('click');
            });
            $('input[type="file"]', elem).change(function() {
                var filename = $(this).val().replace(/^.*\\/, "");
                $('.label-file', elem).html(filename);
                $('.filename').val(filename);
            });
        });

        handleUnlimitedTabsRender();
    });
};

$.fn.actionContextMenu = function(actions) {
    var elem = this;
    if (!actions) {
        actions = ['view', 'edit', 'delete'];
    }
    var items = {};
    $.each(actions, function(key, action) {
        if ($('#action-'+action, elem).length > 0) {
            items[action] = {name: $('#action-'+action, elem).html()};
        }
    });
    if (!$.isEmptyObject(items)) {
        $(elem).contextMenu({
            selector: 'td',
            callback: function(key, options) {
                $('#action-'+key, elem).click()
            },
            items: items
        });
    }
};

function swalConfirm(msg, action) {
    swal({
        title: msg,
        text: '',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dd4b39",
        confirmButtonText: "OK"
    }, function() {
        if ($.isFunction(action)) {
            action();
        } else {
            document.location.href=action;
        }
    });
}

$.fn.loadUI = function() {
    $(this).block({
        message: '<i class="icon-spinner4 spinner"></i>',
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'transparent'
        }
    })
};

function coalesce(str, to) {
    if (str == null) {
        if (to) {
            return to;
        } else {
            return '';
        }
    } else {
        return str;
    }
}

function toFloat(value) {
    value = parseFloat(value);
    if (!$.isNumeric(value)) {
        return 0;
    } else {
        return value;
    }
}

function number_value(str, return_as_zero = true) {
    var parse = str.split(bahasa['decimal_separator']);
    var result = parse[0].split(bahasa['thousand_separator']).join('');
    if ($.isNumeric(result)) {
        if (parse[1]) {
            result += '.' + parse[1];
        }
        return parseFloat(result);
    } else {
        if (return_as_zero) {
            return 0;
        } else {
            return result;
        }
    }
}
