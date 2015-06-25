var mainApp = angular.module('mainApp');

/*******************************************************************
*************** The Service for Shared VAriables *****************
*******************************************************************/
mainApp.service('srvc_sharedVars',['$rootScope', function ($rootScope) {
   var sharedVars = {};
   sharedVars.classPageId = 'loginPage';

   sharedVars.changePageID = function (pageID) {
      this.classPageId = pageID;
      this.NotifyPageChange();
   };

   sharedVars.NotifyPageChange = function () {
      $rootScope.$broadcast('pageChange');
   }
 
   return sharedVars;
}]);
//////////////////////////////////////////////////////////////////////

/******************************************************************
*********** Service for Form Validation **************************
******************************************************************/
mainApp.service('srvc_validateForm', function(){
	var validateForm = {};

	function showErrorIcon (elem) {
		elem.addClass('error');
		elem.next('.error-icon').show();
	}

	function hideErrorIcon (elem) {
		elem.removeClass('error');
		elem.next('.error-icon').hide();
	}

	//check the whole form and bind events as required
	validateForm.bindValidations = function(formID) {
		var jqFormID = '#'+formID;

		/***************** REQUIRED FIELDS VALIDATIONS *****************/
		$(jqFormID).on('keyup blur', '.required', function () {
			if($(this).val().trim().length == 0) {
				showErrorIcon($(this));
			} else {
				hideErrorIcon($(this));
			}
		});

		/************** REPASSWORD VALIDATION ************************/
		/*assumes that form has only 2 input[type="password"], first one
		having .password class and 2nd one having .repassword class*/
		$(jqFormID).on('keyup blur', '.repassword', function () {
			if($(this).val() != $(this).closest('form').find('.password').val()) {
				showErrorIcon($(this));
			} else {
				hideErrorIcon($(this));
			}
		});

		/****************** EMAIL VALIDATION ************************/
		$(jqFormID).on('keyup blur', '.email', function () {
			var value = $(this).val();
			if(/^[A-Z0-9._-]{1,}@[A-Z0-9_-]{1,}[.]{1}[A-Z0-9._-]{1,}$/gi.test(value)) {
				hideErrorIcon($(this));
			} else {
				showErrorIcon($(this));
			}
		});				
	};

	//check if form is error free and ready to be submitted
	validateForm.isErrorFree = function(formID) {

		$('#'+formID).find('.required').each(function(){
			if($(this).val().trim().length == 0) {
				showErrorIcon($(this));
			}
		});

		if($('#'+formID).find('.error').length > 0) {
			console.log('Correct the errors...');
			return false;
		} else {
			console.log('Form validation successful...');
			return true;
		}
	};

	return(validateForm);
});
//////////////////////////////////////////////////////////////////////