var log = function(text){
    console.log(text);
}

$(function(){

    $('body').on('click', '.btn-modal', function(){
        var url = $(this).data('url'),
            className = $(this).data('size');

        $.get(url, function(data){
            var html = `
                <div class="modal fade">
                    <div class="modal-dialog ${className}">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="modal-title">Title</div>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ${data}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="log('testing')">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            $('body').append(html);

            var timeout = setInterval(function(){
                if($('.modal').length) {
                    $('.modal').modal();
                    clearInterval(timeout);
                }
            }, 100);
        });
    });

    $('body').on('hidden.bs.modal', '.modal', function(){
        $(this).remove();
    });

});