var localization = {
    date : function(date, format) {
        var timestamp = new Date(date);
        var d = ('00'+(timestamp.getDate())).substr(-2);
        var m = ('00'+(timestamp.getMonth()+1)).substr(-2);
        var Y = timestamp.getFullYear();
        if (!format) {
            format = bahasa['date_format'];
        }
        format = format.replace('{d}', d);
        format = format.replace('{m}', m);
        format = format.replace('{Y}', Y);
        return format;
    },
    time : function(date, format) {
        var timestamp = new Date(date);
        var H = ('00'+timestamp.getHours()).substr(-2);
        var i = ('00'+timestamp.getMinutes()).substr(-2);
        var s = ('00'+timestamp.getSeconds()).substr(-2);
        if (!format) {
            format = bahasa['time_format'];
        }
        format = format.replace('{H}', H);
        format = format.replace('{i}', i);
        format = format.replace('{s}', s);
        return format;
    },
    datetime : function(date, format) {
        var timestamp = new Date(date);
        var d = ('00'+timestamp.getDate()).substr(-2);
        var m = ('00'+(timestamp.getMonth()+1)).substr(-2);
        var Y = timestamp.getFullYear();
        var H = ('00'+timestamp.getHours()).substr(-2);
        var i = ('00'+timestamp.getMinutes()).substr(-2);
        var s = ('00'+timestamp.getSeconds()).substr(-2);
        if (!format) {
            format = bahasa['datetime_format'];
        }
        format = format.replace('{d}', d);
        format = format.replace('{m}', m);
        format = format.replace('{Y}', Y);
        format = format.replace('{H}', H);
        format = format.replace('{i}', i);
        format = format.replace('{s}', s);
        return format;
    },
    human_date : function(date, format) {
        var timestamp = new Date(date);
        var d = ('00'+timestamp.getDate()).substr(-2);
        var m = bahasa['month_'+('00'+(timestamp.getMonth()+1)).substr(-2)];
        var Y = timestamp.getFullYear();
        var H = ('00'+timestamp.getHours()).substr(-2);
        var i = ('00'+timestamp.getMinutes()).substr(-2);
        var s = ('00'+timestamp.getSeconds()).substr(-2);
        var l = bahasa['day_'+timestamp.getDay()];
        if (!format) {
            format = bahasa['human_date_format'];
        }
        format = format.replace('{d}', d);
        format = format.replace('{m}', m);
        format = format.replace('{Y}', Y);
        format = format.replace('{H}', H);
        format = format.replace('{i}', i);
        format = format.replace('{s}', s);
        format = format.replace('{l}', l);
        return format;
    },
    human_datetime : function(date, format) {
        var timestamp = new Date(date);
        var d = ('00'+timestamp.getDate()).substr(-2);
        var m = bahasa['month_'+('00'+(timestamp.getMonth()+1)).substr(-2)];
        var Y = timestamp.getFullYear();
        var H = ('00'+timestamp.getHours()).substr(-2);
        var i = ('00'+timestamp.getMinutes()).substr(-2);
        var s = ('00'+timestamp.getSeconds()).substr(-2);
        var l = bahasa['day_'+timestamp.getDay()];
        if (!format) {
            format = bahasa['human_datetime_format'];
        }
        format = format.replace('{d}', d);
        format = format.replace('{m}', m);
        format = format.replace('{Y}', Y);
        format = format.replace('{H}', H);
        format = format.replace('{i}', i);
        format = format.replace('{s}', s);
        format = format.replace('{l}', l);
        return format;
    },
    number : function(data, decimals, thousand_separator, decimal_separator) {
        if (typeof(thousand_separator) == 'undefined') {
            thousand_separator = bahasa['thousand_separator'];
        }

        if (typeof(decimal_separator) == 'undefined') {
            decimal_separator = bahasa['decimal_separator'];
        }

        if (typeof(decimals) == 'undefined') {
            decimals = 2;
        }
        data = parseFloat(data);
        if (!$.isNumeric(data)) {
            data = 0;
        }
        data = $.number(data, decimals, decimal_separator, thousand_separator);
        return data;
    },
    number_value : function(str, return_as_zero = true) {
        var parse = str.split(lang['decimal_separator']);
        var result = parse[0].split(lang['thousand_separator']).join('');
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
    },
    to_float: function(value) {
        value = parseFloat(value);
        if (!$.isNumeric(value)) {
            return 0;
        } else {
            return value;
        }
    },
    boolean : function(data, true_result, false_result) {
        if (data == 1 || data == 'true' || data == 't') {
            if (true_result) {
                return true_result;
            } else {
                return '<i class="fa fa-check text-success"></i>';
            }
        }

        if (data == 0 || data == 'false' || data == 'f') {
            if (true_result) {
                return true_result;
            } else {
                return '<i class="fa fa-times text-danger"></i>';
            }
        }
    }
}

var Localization = localization;