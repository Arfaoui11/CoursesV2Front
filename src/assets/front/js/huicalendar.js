var huicalendar = function(element, options){
    this.element = element;
    this.enabledDay = options.enabledDay;
    this.viewDay = options.viewDay || new Date();
    this.year = this.viewDay.getFullYear();
    this.month = this.viewDay.getMonth();
    this.monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.getCalendar();
    this.bindEvent();
}
huicalendar.prototype = {
    getCalendar: function(){
        var that = this;

        var isLeapYear = (((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0));   
        var daysInMonth = [31, (isLeapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.month]

        var dateFirst = new Date(this.year+'/'+(this.month+1)+'/'+1);
        var dateLast = new Date(this.year+'/'+(this.month+1)+'/'+daysInMonth);
        var dayFirst = dateFirst.getDay();
        var dayLast = dateLast.getDay();

        var calendar = [];
        for (var i = dayFirst-1; i >= 0; i--) {
            calendar.push('');
        };
        for (var i = 1; i <= daysInMonth; i++) {
            calendar.push(i);
        };
        for (var i = dayLast+1; i < 7; i++) {
            calendar.push('');
        };

        var tbody = '';
        for (var i = 0; i < calendar.length; i++) {
            if(i%7 == 0){
                tbody += '<tr> <td class="'+( ($.inArray(calendar[i], this.enabledDay) == -1)? '':'enabled' )+'">'+calendar[i]+'</td>';
            } else if(i%7 == 6){
                tbody += '<td class="'+( ($.inArray(calendar[i], this.enabledDay) == -1)? '':'enabled' )+'">'+calendar[i]+'</td> </tr>';
            } else {
                tbody += '<td class="'+( ($.inArray(calendar[i], this.enabledDay) == -1)? '':'enabled' )+'">'+calendar[i]+'</td>';
            }
        };

        var monthTab = '<ul>';
        for (var i = 0; i < this.monthArr.length; i++) {
            monthTab += '<li value="'+i+'" class="'+(i==1? 'border-top1':'')+'">'+this.monthArr[i]+'</li>';
        };
        monthTab += '</ul>';

        var thead = 
        '<thead>'+
            '<tr>'+
                '<th><span class="left"></span></th>'+
                '<th colspan="2" class="month" month="'+(this.month+1)+'">'+this.monthArr[this.month]+monthTab+'</th>'+
                '<th colspan="3" class="year" year="'+this.year+'">'+this.year+'</th>'+
                '<th><span class="right"></span></th>'+
            '</tr>'+
            '<tr class="week">'+
                '<th>S</th>'+
                '<th>M</th>'+
                '<th>T</th>'+
                '<th>W</th>'+
                '<th>T</th>'+
                '<th>F</th>'+
                '<th>S</th>'+
            '</tr>'+
        '</thead>';
        var table = '<table class="huicalendar huicalendar1 huicalendar2" cellspacing="0">'+thead+'<tbody>'+tbody+'</tbody></table>';
        this.element.html(table);
    },
    bindEvent: function(){
        var that = this;
        this.element.on('click', '.left', function(){
            that.month--;
            if(that.month == -1){
                that.month = 11;
                that.year--;
                if(that.year == 1900){
                    that.year++;
                    that.month++;
                }
            }
            that.getCalendar();
            that.element.trigger({
                type: 'changeMonth',
                month: parseInt(that.month)+1,
                year: parseInt(that.year)
            })
        })
        this.element.on('click', '.right', function(){
            that.month++;
            if(that.month == 12){
                that.month = 0;
                that.year++;
            }
            that.getCalendar();
            that.element.trigger({
                type: 'changeMonth',
                month: parseInt(that.month)+1,
                year: parseInt(that.year)
            })
        })
        this.element.on('click', '.month', function(){
            $(this).find('ul').toggle();
            // $(this).toggleClass('show');
        })
        this.element.on('click', '.month li', function(){
            var value = $(this).attr('value');
            that.month = value;
            that.getCalendar();
            that.element.trigger({
                type: 'changeMonth',
                month: parseInt(that.month)+1,
                year: parseInt(that.year)
            })
        })
        this.element.on('click', '.enabled', function(){
            that.element.trigger({
                type: 'changeDate',
                date: $(this).html(),
                month: parseInt(that.month)+1,
                year: parseInt(that.year)
            })
        })
    }

}
$.fn.huicalendar = function(options, operate){
    if(operate == 'update'){
        var hui = $(this).data('huicalendar');
        hui.enabledDay = options.enabledDay;
        hui.viewDay = options.viewDay || new Date();
        hui.year = hui.viewDay.getFullYear();
        hui.month = hui.viewDay.getMonth();
        hui.getCalendar();
    } else {
        var hui = new huicalendar(this, options);
        $(this).data('huicalendar', hui);
    }
    
    return this;
}
