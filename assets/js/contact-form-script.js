/*==============================================================*/
// Klev Contact Form JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // Handle the invalid form
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // Everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        // Initiate Variables With Form Content
        var formData = {
            access_key: "eca765e2-1363-43ed-a535-a037bd5d9c52", // Replace this with your Web3Forms access key
            name: $("#name").val(),
            email: $("#email").val(),
            phone_number: $("#phone_number").val(),
            subject: $("#subject").val(),
            message: $("#message").val(),
        };

        $.ajax({
            type: "POST",
            url: "https://api.web3forms.com/submit",
            contentType: "application/json", // Set content type to JSON
            data: JSON.stringify(formData), // Convert formData to JSON string
            success: function (response) {
                if (response.success) {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, "Something went wrong. Please try again.");
                }
            },
            error: function (error) {
                formError();
                submitMSG(false, "Error: " + error.responseJSON.message || "An error occurred.");
            },
        });
    }

    function formSuccess() {
        $("#contactForm")[0].reset(); // Reset the form
        submitMSG(true, "Message Submitted Successfully!");
    }

    function formError() {
        $("#contactForm")
            .removeClass()
            .addClass("shake animated")
            .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).removeClass();
            });
    }

    function submitMSG(valid, msg) {
        var msgClasses = valid
            ? "h4 text-left tada animated text-success"
            : "h4 text-left text-danger";
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
})(jQuery); // End of use strict
