$(document).ready(function () {
    $('.node').click(function() {
        $(this).next('.hidden').slideToggle();
        $(this).parent().siblings().find('ul').slideUp();
        $(this).parent().find('.node').removeClass('active');
        $(this).parent().siblings().find('.active').removeClass('active');
        $(this).addClass('active');
    });

    $("#committee5").change(function() {
        if ($(this).data('options') === undefined) {
          /*Taking an array of all options-2 and kind of embedding it on the select1*/
          $(this).data('options', $('#subcommittee5 option').clone());
        }
        var id = $(this).val();
        var options = $(this).data('options').filter('[value=' + id + ']');
        $('#subcommittee5').html(options);
    });

    $("#committee6").change(function() {
        if ($(this).data('options') === undefined) {
          /*Taking an array of all options-2 and kind of embedding it on the select1*/
          $(this).data('options', $('#subcommittee6 option').clone());
        }
        var id = $(this).val();
        var options = $(this).data('options').filter('[value=' + id + ']');
        $('#subcommittee6').html(options);
    });

    $("#committee7").change(function() {
        if ($(this).data('options') === undefined) {
          /*Taking an array of all options-2 and kind of embedding it on the select1*/
          $(this).data('options', $('#subcommittee7 option').clone());
        }
        var id = $(this).val();
        var options = $(this).data('options').filter('[value=' + id + ']');
        $('#subcommittee7').html(options);
    });

    $("#committee8").change(function() {
        if ($(this).data('options') === undefined) {
          /*Taking an array of all options-2 and kind of embedding it on the select1*/
          $(this).data('options', $('#subcommittee8 option').clone());
        }
        var id = $(this).val();
        var options = $(this).data('options').filter('[value=' + id + ']');
        $('#subcommittee8').html(options);
    });
});


function setParam(id) {

  document.getElementById('hidden-param').value = id
}