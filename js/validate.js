$.fn.validate = function() {
    function required(elem) {
        if ($(elem).val() === '') {
            total_errors++;
            $('#'+$(elem).attr('id')).closest('.form-group').append('<p class="text-danger validation-message">The '+$(elem).attr('name')+' is required</p>');
        }
    }

    $('.validation-message').remove();
    var errors = [];
    var total_errors = 0;

    $('[required]', this).each(function(key, elem) {
        required(elem);
    });

    $('[data-validate]', this).each(function(key, elem) {
        var parse = $(elem).data('validate').split('|');
        $.each(parse, function(a, b) {
            if (b === 'required') {
                required(elem);
            }
        });
    });

    if (total_errors === 0) {
        return true;
    }
    return false;
}

var validation = {
    errors: [],
    run: function(rules) {
        validation.errors = [];
        $.each(rules, function(key, rule) {
            if ($.isFunction(rule.rules)) {
                rule.rules(rule.name, rule.label);
            } else {
                var parse = rule.rules.split('|');
                $.each(parse, function(a, b) {
                    validation[b](rule.name, rule.label)
                });
            }
        });
        if (validation.errors.length === 0) {
            return true;
        } else {
            return false;
        }
    },
    required: function(name, label) {
        if ($('[name="'+name+'"]').val() == '') {
            validation.errors.push('The '+label+' field is required');
        }
    },
    numeric: function(name, label) {
        if ($('[name="'+name+'"]').val()) {
            if (!$.isNumeric($('[name="'+name+'"]').val())) {
                validation.errors.push('The '+label+' field must contain only numbers');
            }
        }
    },
    showErrors: function(target) {
        $(target).html('');
        if (validation.errors.length > 0) {
            var messages = '<div class="alert alert-danger alert-dismissible">';
                messages +='<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
                messages +='<h4><i class="icon fa fa-ban"></i> Form tidak terisi dengan benar!</h4>';
            $.each(validation.errors, function(key, error) {
                messages += '<p>'+error+'</p>';
            });
            messages += '</div>';
            $(target).html(messages);
        }
    }
};