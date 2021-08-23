$('form').submit(function (e) {
    e.preventDefault(e);

    $.ajax({
        url: $('form').attr('action'),
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({name: "vit@gmail.com", password: "1234"}),
        success: function (data) {
            console.log('Form response:', data);
            window.location = "/view-user"
        }
    });
});