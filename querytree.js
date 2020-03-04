$(document).ready(function () {
    $('.node').click(function() {
        $(this).next('.hidden').slideToggle();
        $(this).parent().siblings().find('ul').slideUp();
        $(this).parent().find('.node').removeClass('active');
        $(this).parent().siblings().find('.active').removeClass('active');
        $(this).addClass('active');
    });
    $('.active').click(function () {
        console.log(this.id);
    });
});