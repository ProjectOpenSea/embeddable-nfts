// IIFE - Immediately Invoked Function Expression
(function (code) {

    // The global jQuery object is passed as a parameter
    code(window.jQuery, window, document)

}(function ($, window, document) {

    // The $ is now locally scoped
    // Listen for the jQuery ready event on the document
    $(async function () {

    })

    $("#viewAsset").click(function(){
        $('#nftCard')
    })

    const asset = {
        contractAddress: '',
        tokenId: ''
    }


     let timeout = null // Init a timeout variable to be used below
     $( ".input" ).keyup(function() {

        // Clear the timeout if it has already been set. Prevents previous
        // task from executing if it's been less than <MILLISECONDS>
        clearTimeout(timeout)
//           $('#nftCard').attr('contractAddress')

       // Make a new timeout set to go off in 800ms
        timeout = setTimeout(async () => {

         // Execute the task here after 500ms
            asset[$(this)[0].id] = $(this).val()

        }, 500)
     })
}))
