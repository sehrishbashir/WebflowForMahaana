// CREDS SETUP
const currentDomain = window.location.hostname;
const corporate = 'corporate';
const individual = 'personal';

let mahaanaWealthCashFund;
let mahaanaInvitee;
let domainURL;
if(!currentDomain.includes('webflow')){
  mahaanaWealthCashFund = 'https://stg-mahaana-wealth-cashfund.azurewebsites.net'
  mahaanaInvitee = 'https://stg-mahaana-dfa-invitemahaniers.azurewebsites.net'
  domainURL = 'https://mahaana.com/'
} else {
  mahaanaWealthCashFund = 'https://prod-mahaana-wealth-cashfund.azurewebsites.net'
  mahaanaInvitee = 'https://prod-mahaana-dfa-invitemahaniers.azurewebsites.net'
  domainURL = 'https://mahaana.webflow.io/'
}

// HELP CRUNCH
const org = 'mahaanawealth';
const appId = '3e2db6fc-88c6-4d53-8713-fa639bf8c4f2';
const userData = {custom_data: {approch: 'Website'}}

window.helpcrunchSettings = { organization: org, appId: appId, user: userData};
(function(w,d){var hS=w.helpcrunchSettings;if(!hS||!hS.organization){return;}var widgetSrc='https://'+hS.organization+'.widget.helpcrunch.com/';w.HelpCrunch=function(){w.HelpCrunch.q.push(arguments)};w.HelpCrunch.q=[];function r(){if (d.querySelector('script[src="' + widgetSrc + '"')) { return; }var s=d.createElement('script');s.async=1;s.type='text/javascript';s.src=widgetSrc;(d.body||d.head).appendChild(s);}if(d.readyState === 'complete'||hS.loadImmediately){r();} else if(w.attachEvent){w.attachEvent('onload',r)}else{w.addEventListener('load',r,false)}})(window, document)

// SCROLL TO TOP
function scrollToTop(){window.scroll({ top: 0, behavior: 'smooth' })}
window.addEventListener('unload', () => scrollToTop());
$(window).scroll(function() {if($(this).scrollTop() >= 400) {$('#return-to-top').fadeIn(200)} else{$('#return-to-top').fadeOut(200)}});
$('#return-to-top').click(function() {scrollToTop()});


// VARIABLES OF QUERY
const homeAccordions = document.querySelectorAll('.faq-accordionwrap.common-faqs  .single-accordion');
const generalAccordions = document.querySelectorAll('.general-faqs .faq-accordionwrap .single-accordion');
const mahaanaAccordions = document.querySelectorAll('.mahaana-save-faqs .faq-accordionwrap .single-accordion');
// GET IN TOUCH FORM FIELDS
const gitFormMoal = document.querySelector('.modal-wrapper');
const gitForm = document.getElementById("wf-form-Get-In-Touch-Form");
const gitSucess = document.querySelector('.get-in-touch-form .success-message');
const gitSubmit = document.querySelector('.submit-getintouch-form');
const gitError = document.querySelector('.get-in-touch-form .w-form-fail');
const gitErrorMsg = document.querySelector('.get-in-touch-form .w-form-fail div');
const nameInput = document.querySelector('.name-field');
const emailInput = document.querySelector('.email-field');
const phoneNumberInput = document.querySelector('.phone-field');
const msgInput = document.querySelector('.message-field');
const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const phoneNumberError = document.querySelector('.phonenumber-error');
// WAITLIST FORM FIELDS
const wlFormModal = document.querySelector('#waitlist-modal-wrapper');
const wlForm = document.getElementById("waitlist-form");
const wlSucess = document.querySelector('#waitlist-success-form')
const wlError = document.querySelector('#waitlist-form-error')
const wlErrorMsg = document.querySelector('#waitlist-error-form-message');
const wlSubmit = document.querySelector('#waitlist-submit');
const wlNameInput = document.querySelector('#waitlist-name');
const wlEmailInput = document.querySelector('#waitlist-email');
const wlNameError = document.querySelector('#waitlist-name-error');
const wlEmailError = document.querySelector('#waitlist-email-error');
// ERROR MESGS
const nameMsg = "Please enter your name"; 
const emailMsg = "Please enter your email"; 
const phoneMsg = "Please enter your phone number"; 
const invalidEmail = "Invalid email address"; 
const userAddedMsg = "User has already been added to the waitlist";