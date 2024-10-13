$.fn.buildFilter = function() {
    var filter = this
    var formFilter = $('form', $(filter));
    $('[data-toggle="add-filter"]', $(filter)).change(function() {
        $('[data-filter="'+$(this).val()+'"]').show();
        $('[name="filters['+$(this).val()+'][active]"]').prop('checked', true);
        $(this).val('');
    });
    $('[data-filter]', $(formFilter)).each(function(key, elem) {
        var column = $(elem).data('filter');
        $('[name="filters['+column+'][operation]"]').change(function() {
            var operation = $('[name="filters['+column+'][operation]"]').val();
            if ($('[data-input-operation="'+operation+'"]', elem).length) {
                $('[name="filters['+column+'][value]"]', elem).hide();
                $('[data-input-operation="'+operation+'"]', elem).show();
            } else {
                $('[data-input-operation]', elem).hide();
                $('[name="filters['+column+'][value]"]', elem).show();
            }
        });
        $('[name="filters['+column+'][operation]"]', elem).change();
        $('[data-browse-source]', elem).click(function() {
            $.ajax({
                url: $('[data-browse-source]', elem).data('browse-source'),
                success: function(response) {
                    bootbox.dialog({
                        title: 'Browse',
                        size: 'large',
                        message: response
                    });
                }
            })
        });
    });
    $('[data-toggle="filter"]', $(formFilter)).click(function() {
        if ($.isFunction(window.filter)) {
            window.filter();
        }
    });
    $('[data-toggle="clear"]', $(formFilter)).click(function() {
        $('input[type="text"], textarea', $(formFilter)).val('');
        $('select').val($('select option:first', $(formFilter)).val());
        $('select[data-input-type="select2"]').change();
        if ($.isFunction(window.filter)) {
            window.filter();
        }
    });
}