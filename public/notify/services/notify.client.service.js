angular.module('Notify').factory('notificationFactory', function() {
    toastr.options.closeButton = true;
    return {
        success: function(text) {
            toastr.success(text, "Success");
        },
        error: function(text) {
            toastr.error(text, "Error");
        },
        info: function(text) {
            toastr.info(text, "Info");
        }
    };
});
