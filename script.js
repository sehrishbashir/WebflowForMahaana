// CREDS SETUP
const currentDomain = window.location.hostname;
const corporate = 'corporate';
const individual = 'personal';

let mahaanaWealthCashFund;
let mahaanaInvitee;
let domainURL;
if(!currentDomain.includes('webflow')){
  mahaanaWealthCashFund = 'https://prod-mahaana-wealth-cashfund.azurewebsites.net'
  mahaanaInvitee = 'https://prod-mahaana-dfa-invitemahaniers.azurewebsites.net'
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