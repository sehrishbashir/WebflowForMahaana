// ---------------- CREDS SETUP ---------------- //
currentDomain = window.location.hostname;
corporate = window.env.CORPORATE;
individual = window.env.INDIVIDUAL;

mahaanaWealthCashFund = window.env.CASHFUND
mahaanaInvitee = window.env.INVITE_MAHANIERS
domainURL = window.env.DOMAIN_URL

if (!currentDomain.includes('webflow')) {
    mahaanaWealthCashFund = 'https://stg-mahaana-wealth-cashfund.azurewebsites.net'
    mahaanaInvitee = 'https://stg-mahaana-dfa-invitemahaniers.azurewebsites.net'
    domainURL = 'https://mahaana.com/'
} else {
    mahaanaWealthCashFund = 'https://stg-mahaana-wealth-cashfund.azurewebsites.net'
    mahaanaInvitee = 'https://stg-mahaana-dfa-invitemahaniers.azurewebsites.net'
    domainURL = 'https://mahaana.webflow.io/'
}
// ---------------------------------------------- //


// ---------------- HELP CRUNCH ---------------- //
const org = window.env.HC_ORGANIZATION;
const appId = window.env.HC_APPID;
const userData = { custom_data: { approch: 'Website' } }

window.helpcrunchSettings = { organization: org, appId: appId, user: userData };
(function (w, d) { var hS = w.helpcrunchSettings; if (!hS || !hS.organization) { return; } var widgetSrc = 'https://' + hS.organization + '.widget.helpcrunch.com/'; w.HelpCrunch = function () { w.HelpCrunch.q.push(arguments) }; w.HelpCrunch.q = []; function r() { if (d.querySelector('script[src="' + widgetSrc + '"')) { return; } var s = d.createElement('script'); s.async = 1; s.type = 'text/javascript'; s.src = widgetSrc; (d.body || d.head).appendChild(s); } if (d.readyState === 'complete' || hS.loadImmediately) { r(); } else if (w.attachEvent) { w.attachEvent('onload', r) } else { w.addEventListener('load', r, false) } })(window, document)
// ---------------------------------------------- //


// ---------------- SCROLL TO TOP ---------------- //
function scrollToTop() { window.scroll({ top: 0, behavior: 'smooth' }) }
window.addEventListener('unload', () => scrollToTop());
$(window).scroll(function () { if ($(this).scrollTop() >= 400) { $('#return-to-top').fadeIn(200) } else { $('#return-to-top').fadeOut(200) } });
$('#return-to-top').click(function () { scrollToTop() });
// ---------------------------------------------- //


// ---------------- VARIABLES ---------------- //
const gElementsToReset = [];
const wElementsToReset = [];
const cElementsToReset = [];

const headers = { 'Content-Type': 'application/json' };
const currentYear = new Date().getFullYear();
const currentYearElement = document.querySelectorAll('.current-year');

// QUERY
const homeBody = document.querySelector('body');

// HEADER DROPDOWN
// localStorage.setItem('selectedItem', individual.toLowerCase())
let selectedItem = localStorage.getItem('selectedItem');
const dropDownItems = document.querySelectorAll('.choose-type-wrap');
const navSelectedItem = document.querySelectorAll('.nav-selected-item');
const dropdownMenu = document.querySelectorAll('#dropdown-menu');
const b2bBody = document.getElementById('B2B-Body');
const b2cBody = document.getElementById('B2C-Body');


// ACCORDION WRAPPERS
const homeAccordions = document.querySelectorAll('.faq-accordionwrap.common-faqs  .single-accordion');
const generalAccordions = document.querySelectorAll('.general-faqs .faq-accordionwrap .single-accordion');
const mahaanaAccordions = document.querySelectorAll('.mahaana-save-faqs .faq-accordionwrap .single-accordion');

// MODALS ASSETS
const closeButton = document.querySelector('.modal-close-button');
const closeByBg = document.querySelector('.modal-bg');
const modalWrap = document.querySelectorAll('.modal-wrapper')
const buttons = document.querySelectorAll('.open-get-in-touch-form')
const closeModal = document.querySelectorAll('.modal-bg')

const wlCancelButton = document.querySelector('#waitlist-cancel');
const wlCloseButton = document.querySelector('#waitlist-close');
const wlBackdrop = document.querySelector('#waitlist-backdrop');

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

// CONTACT US FORM FIELS
const cuForm = document.getElementById('wf-form-contact-us');
const cuSubmit = document.getElementById('contact-us-submit');
const cuSuccessModal = document.getElementById('contact-us-sucess-modal');
const cuError = document.getElementById('wf-form-error');
const cuErrorText = document.getElementById('contact-us-error-text');
const cuBd = document.getElementById('contact-us-backdrop');
const cuCloseBtn = document.getElementById('contact-us-close-button');
// name field with error
const cuName = document.getElementById('contact-us-name');
const cuNameError = document.getElementById('contact-us-name-error');
// email field with error
const cuEmail = document.getElementById('contact-us-email');
const cuEmailError = document.getElementById('contact-us-email-error');
// msg field with error
const cuMsg = document.getElementById('contact-us-message');
const cuMsgError = document.getElementById('contact-us-msg-error');

// ERROR MESGS
const nameMsg = "Please enter your name";
const emailMsg = "Please enter your email";
const phoneMsg = "Please enter your phone number";
const requiredMessage = "Please enter message";
const invalidEmail = "Invalid email address";
const userAddedMsg = "User has already been added to the waitlist";

// ---------------------------------------------- //


// ---------------- FORM HELPERS ---------------- //

// ELEMENT TOGGLER
function hideElements(...elements) { elements.forEach((element) => { if (element) { element.style.display = 'none' } }) }
function showElements(...elements) { elements.forEach((element) => { if (element) { element.style.display = 'block' } }) }

// DISABLED ELEMENT
function handleDisabled(inputs, boolean) { inputs.forEach(element => (element.disabled = boolean)) }

// TEXT UPDATER
function handleBtnStatus(btn, status) { btn.value = status }

// VALIDATORS
function isValidEmail(email) { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return emailRegex.test(email) }
function setupInputValidation(inputField, errorElement) {
    if (inputField) {
        inputField.addEventListener('input', function () {
            if (wlError) { hideElements(wlError); wlErrorMsg.innerText = ''; }
            if (inputField.value.trim() !== '') { hideElements(errorElement); inputField.classList.remove('input-error') }
        });
        return { inputField, errorElement }
    }
}
function handleInputValidation(inputField, errorElement) { inputField.addEventListener('input', function () { if (inputField.value !== '') { hideElements(errorElement); inputField.classList.remove('input-error') } }) }
function validateInput(inputField, errorElement, errorMessage, minLength) {
    const trimmedValue = inputField.value.trim();
    if (trimmedValue === '') {
        errorElement.innerHTML = errorMessage;
        showElements(errorElement);
        inputField.classList.add('input-error');
        return false;

    } else if (minLength && trimmedValue.length < minLength) {
        errorElement.innerHTML = 'Please enter at least ' + minLength + ' characters';
        showElements(errorElement);
        inputField.classList.add('input-error');
        return false;
    }
    return true;
}

// FORM RESET
function resetForm(form, elementsToReset) {
    form.reset();
    if (elementsToReset) {
        elementsToReset.forEach(({ errorElement, inputField }) => hideErrorMessage(errorElement, inputField))
    }
}

// ERROR HANDLER
function handleErrorList(err, errMsg, errorData, emailErr, nameErr) {
    const errorsList = JSON.parse(errorData); hideElements(err); errMsg.innerText = '';
    if (errorsList.errors) {
        for (const key in errorsList.errors) {
            if (key.toLowerCase() === 'email') {
                showElements(emailErr);
                const message = errorsList.errors[key][0].toLowerCase().split('_').join(" ");
                const selectiveMessage = message == "not valid" ? invalidEmail : message;
                emailErr.innerText = selectiveMessage.charAt(0).toUpperCase() + selectiveMessage.slice(1);
                emailErr.style.textTransform = 'capitalize';
            }
            else if (key.toLowerCase() === 'name') {
                showElements(nameErr);
                nameErr.innerText = errorsList.errors[key][0]
            }
        }
    }
}
function hideErrorMessage(errorElement, inputField) { hideElements(errorElement); inputField.classList.remove('input-error') }

// INITIALIZER
function handleInitForm(elements) {
    elements.forEach((field) => { field.inputField.classList.remove('input-error'); hideElements(field.errorElement) });
    const inputValidations = elements.map((field) => validateInput(field.inputField, field.errorElement, field.message, field.validator));
    return inputValidations;
}

// FORM SUMITTION HANDLING  
function handleFormSubmission(apiURL, formData, inputs, handleSuccess, handleError) {
    fetch(apiURL, { method: 'POST', headers: headers, body: JSON.stringify(formData) })
        .then((response) => {
            if (!response.ok) {
                const errorCode = response.status;
                return response.text().then((errorData) => {
                    handleDisabled(inputs, false); handleError(errorData, errorCode);
                    throw new Error(errorData || 'Unknown error occurred.')
                })
            }
            return response.json()
        })
        .then((data) => handleSuccess())
        .catch((error) => console.log('Error occurred:', error))
}

// FORMS ASSETS
const GIFormElements = [
    { inputField: nameInput, errorElement: nameError, message: nameMsg, validator: 3 },
    { inputField: emailInput, errorElement: emailError, message: emailMsg, validator: isValidEmail },
    { inputField: phoneNumberInput, errorElement: phoneNumberError, message: phoneMsg, validator: 11 }
];
const WLFormElements = [
    { inputField: wlNameInput, errorElement: wlNameError, message: nameMsg, validator: 3 },
    { inputField: wlEmailInput, errorElement: wlEmailError, message: emailMsg, validator: isValidEmail }
];
const CUFormElements = [
    { inputField: cuName, errorElement: cuNameError, message: nameMsg, validator: 3 },
    { inputField: cuEmail, errorElement: cuEmailError, message: emailMsg, validator: isValidEmail },
    { inputField: cuMsg, errorElement: cuMsgError, message: requiredMessage }
];


buttons.forEach(button => { button.addEventListener('click', function handleClick(event) { homeBody.style.overflowY = 'hidden'; $('form#wf-form-Get-In-Touch-Form')[0].reset() }) });
// if (closeButton) { closeButton.forEach(item => { item.addEventListener('click', function handleClick(event) { homeBody.style.overflowY = 'auto' }) }) }
// if (closeModal) { closeModal.forEach(item => { item.addEventListener('click', function handleClick(event) { homeBody.style.overflowY = 'auto' }) }) }

// ---------------------------------------------- //


document.addEventListener("DOMContentLoaded", function () {
    // DATE UPDATER
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.querySelectorAll('.current-year');
    currentYearElement.forEach(function (element) { element.innerHTML = currentYear });
});

// ---------------- FORMS INITIALIZATION ---------------- //
// FORM ELEMENTS
GIFormElements.forEach((element) => gElementsToReset.push(setupInputValidation(element.inputField, element.errorElement)));
WLFormElements.forEach((element) => wElementsToReset.push(setupInputValidation(element.inputField, element.errorElement)));
CUFormElements.forEach((element) => cElementsToReset.push(setupInputValidation(element.inputField, element.errorElement)));

// GI
if (closeButton || closeByBg) {
    [closeButton, closeByBg].forEach((element) => element.addEventListener('click', function () {
        resetForm(gitForm, gElementsToReset)
        homeBody.style.overflowY = 'auto'
    }))
}
// WL
if (wlCloseButton || wlBackdrop || wlCancelButton) {
    [wlCloseButton, wlBackdrop, wlCancelButton].forEach((element) => element.addEventListener('click', function () {
        resetForm(wlForm, wElementsToReset);
        hideElements(wlError)
        homeBody.style.overflowY = 'auto'
    }))
}
// CU
if (cuBd || cuCloseBtn) {
    [cuBd, cuCloseBtn].forEach((element) => element.addEventListener('click', function () {
        resetForm(cuForm, cElementsToReset);
        homeBody.style.overflowY = 'auto'
    }))
}

// GET IN TOUCH FORM
var Webflow = Webflow || [];
Webflow.push(function () {
    $('form#wf-form-Get-In-Touch-Form').submit(function (evt) {
        evt.preventDefault();
        const inputValidations = handleInitForm(GIFormElements);
        if (inputValidations.every((isValid) => isValid)) {
            $(document).off('submit');
            const formData = { name: nameInput.value, email: emailInput.value, phoneNumber: phoneNumberInput.value, message: msgInput.value };
            handleBtnStatus(gitSubmit, 'Please wait ...');
            const inputs = [nameInput, emailInput, phoneNumberInput, gitSubmit]
            function handleSuccess() {
                handleBtnStatus(gitSubmit, 'Send'); handleDisabled(inputs, false); hideElements(gitForm); showElements(gitSucess);
                setTimeout(() => { hideElements(gitFormMoal); hideElements(gitSucess); showElements(gitForm); gitForm.reset() }, 3000)
            }
            function handleError(errorData) {
                handleBtnStatus(gitSubmit, 'Send');
                if (errorData.charAt(0) == "{") { handleErrorList(gitError, gitErrorMsg, errorData, emailError, nameError) }
                else { gitErrorMsg.innerText = errorData; showElements(gitError) }
            }
            handleDisabled(inputs, true)
            handleFormSubmission(`${mahaanaInvitee}/api/Message`, formData, inputs, handleSuccess, handleError);
        } else { $(document).off('submit') }
    })
});

// WAITLIST FORM
var Webflow = Webflow || [];
Webflow.push(function () {
    $('form#waitlist-form').submit(function (evt) {
        evt.preventDefault();
        const inputValidations = handleInitForm(WLFormElements);
        if (inputValidations.every((isValid) => isValid)) {
            $(document).off('submit');
            const formData = { name: wlNameInput.value, email: wlEmailInput.value };
            handleBtnStatus(wlSubmit, 'Please wait ...');
            const inputs = [wlNameInput, wlEmailInput, wlSubmit]
            handleDisabled(inputs, true)

            function handleSuccess() {
                handleBtnStatus(wlSubmit, 'Send'); 
                handleDisabled(inputs, false); 
                hideElements(wlForm); s
                howElements(wlSucess);
                setTimeout(() => { 
                    hideElements(wlFormModal, wlSucess); 
                    showElements(wlForm); 
                    wlForm.reset() 
                }, 3000)
            }
            function handleError(errorData, errorCode) {
                handleBtnStatus(wlSubmit, 'Send');
                if (errorData.charAt(0) == "{") { 
                    handleErrorList(wlError, wlErrorMsg, errorData, wlEmailError, wlNameError) 
                }
                else { 
                    wlErrorMsg.innerText = errorCode == 409 ? userAddedMsg : errorData; 
                    showElements(wlError) 
                }
            }
            handleFormSubmission(`${mahaanaInvitee}/api/WaitList`, formData, inputs, handleSuccess, handleError);
        } else { $(document).off('submit') }
    })
});

// CONTACT US FORM
var Webflow = Webflow || [];
Webflow.push(function () {
    $('form#wf-form-contact-us').submit(function (evt) {
        evt.preventDefault();

        const inputValidations = handleInitForm(CUFormElements);

        if (inputValidations.every((isValid) => isValid)) {
            $(document).off('submit');

            const formData = {
                name: cuName.value, 
                email: cuEmail.value, 
                message: cuMsg.value
            };

            handleBtnStatus(cuSubmit, 'Please wait ...');

            const inputs = [cuName, cuEmail, cuMsg, cuSubmit]

            function handleSuccess() {
                handleBtnStatus(cuSubmit, 'Send'); 
                handleDisabled(inputs, false); 
                hideElements(cuForm); 
                showElements(cuSuccessModal);
                setTimeout(() => { 
                    hideElements(cuSuccessModal); 
                    showElements(cuForm); 
                    cuForm.reset() 
                }, 3000)
            }
            function handleError(errorData) {
                handleBtnStatus(gitSubmit, 'Send');
                if (errorData.charAt(0) == "{") { 
                    handleErrorList(cuError, cuErrorText, errorData, emailError, nameError) 
                }
                else { 
                    cuErrorText.innerText = errorData; 
                    showElements(cuError) 
                }
            }
            handleDisabled(inputs, true)
            handleFormSubmission(`${mahaanaInvitee}/api/Message`, formData, inputs, handleSuccess, handleError);

        } else {
            $(document).off('submit')
        }
    })
});

// ---------------------------------------------- //


// ---------------- SLIDERS ---------------- //
// SLIDER REFRESHERS
function refreshSlickSlider(selector) {
    $(selector).each(function () {
        const slider = $(this);
        if (slider.hasClass('slick-initialized')) { slider.slick('refresh') }
    })
}
function refreshSlickSliders() {
    setTimeout(function () { refreshSlickSlider('.b2c-home-slider'); refreshSlickSlider('.slider-list'); refreshSlickSlider('.team-slider') }, 100)
}

// IMAGE RESIZING
document.addEventListener('DOMContentLoaded', function () { imageResizing(); });
function imageResizing() {
    const listDiv = document.querySelector('.w-list-unstyled');
    const image = document.querySelector('.div-block-34 img');
    function setImageHeight() { const listHeight = listDiv.offsetHeight; image.style.height = `${listHeight}px` }
    function onImageLoad() { setImageHeight(); window.addEventListener('resize', setImageHeight) }
    if (listDiv && image) {
        if (image.complete) { onImageLoad() }
        else { image.addEventListener('load', onImageLoad) }
    }
}

// SLIDER INITIALIZERS
$(document).ready(function () {
    $('.team-slider').slick({ slidesToShow: 1, slidesToScroll: 1, dots: false, infinite: true, arrows: false });
    $('.team-prev-arrow').click(function () { $('.team-slider').slick('slickPrev') });
    $('.team-next-arrow').click(function () { $('.team-slider').slick('slickNext') });
    $('.b2c-home-slider').slick({ slidesToShow: 1, slidesToScroll: 1, dots: false, infinite: true, arrows: false });
    $('.b2c-prev-slick').click(function () { $('.b2c-home-slider').slick('slickPrev') });
    $('.b2c-next-slick').click(function () { $('.b2c-home-slider').slick('slickNext') });
    const sliderList = $('.slider-list');
    sliderList.on('init', function (event, slick) {
        const prevArrow = $('.prev-arrow');
        const nextArrow = $('.next-arrow');
        function updateArrowStatus() {
            const totalSlides = slick.slideCount;
            const currentSlide = slick.currentSlide;
            if (currentSlide === 0) { prevArrow.addClass('disabled') }
            else { prevArrow.removeClass('disabled') }
            if (currentSlide >= totalSlides - slick.options.slidesToShow) { nextArrow.addClass('disabled') }
            else { nextArrow.removeClass('disabled') }
        }
        updateArrowStatus();
        sliderList.on('afterChange', function (event, slick, currentSlide) { updateArrowStatus() });
        prevArrow.click(function () { sliderList.slick('slickPrev') });
        nextArrow.click(function () { sliderList.slick('slickNext') });
    });
    sliderList.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        infinite: false,
        arrows: false,
        responsive: [
            { breakpoint: 1020, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 650, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, dots: false } }
        ]
    })
});
// ---------------------------------------------- //


// ---------------- ACCORDIONS ---------------- //
function initializeAccordions(accordions) {
    let openAccordion = null;
    function closeAccordion(accordion) {
        const paragraph = accordion.querySelector('.faqs-paragraph');
        const icon = accordion.querySelector('.acc-iconwrap svg');
        paragraph.style.height = '0';
        icon.style.transform = 'rotate(0deg)';
        accordion.classList.remove('open');
    }
    function openNewAcc(accordion) {
        if (accordion) {
            const iconWrap = accordion.querySelector('.acc-iconwrap');
            const paragraph = accordion.querySelector('.faqs-paragraph');
            const icon = iconWrap.querySelector('svg');
            if (openAccordion === accordion) { closeAccordion(accordion); openAccordion = null }
            else {
                if (openAccordion) { closeAccordion(openAccordion) }
                openAccordion = accordion; accordion.classList.add('open');
                paragraph.style.height = 'auto';
                const height = paragraph.clientHeight + 'px';
                paragraph.style.height = '0';
                setTimeout(function () { paragraph.style.height = height }, 0);
                icon.style.transform = 'rotate(180deg)';
            }
        }
    }
    accordions.forEach(function (accordion) { accordion.addEventListener('click', function () { event.stopPropagation(); openNewAcc(accordion) }) });
    if (accordions.length > 0) { openNewAcc(accordions[0]) }
}
initializeAccordions(homeAccordions);
initializeAccordions(generalAccordions);
initializeAccordions(mahaanaAccordions);
// ---------------------------------------------- //


// ---------------- TRUNCATE TEXT BY ... ---------------- //
function truncateText(elements, limit) {
    Array.from(elements).forEach(element => {
        const text = element.innerHTML;
        if (text.length > limit) { element.innerHTML = text.substr(0, limit) + '...' }
    })
}
const blogCardParaElements = document.getElementsByClassName('blog-card-para');
const blogTitleElements = document.getElementsByClassName('blog-title');
const paraLimit = 100;
const titleLimit = 50;
truncateText(blogCardParaElements, paraLimit);
truncateText(blogTitleElements, titleLimit);

// ---------------------------------------------- //


// ---------------- NAV DROP DOWN ---------------- //
if (selectedItem === null) {
    setDropdownItem(individual);
    if (window.location.href == domainURL) { handleBody(individual) }
    else { handleClick(individual) }
}
else {
    setDropdownItem(selectedItem)
    if (window.location.href == domainURL) { handleBody(selectedItem) }
    else { handleClick(selectedItem) }
}

dropDownItems.forEach(function (item) {
    item.addEventListener('click', () => {
        const selectVal = item.querySelector('.choose-type').textContent.toLowerCase();
        handleClick(selectVal); setDropdownItem(selectVal); handleBody(selectVal);
    })
})

function handleClick(selected) {
    dropDownItems.forEach((item, i) => {
        const newVal = item.querySelector('.choose-type').textContent.toLowerCase()
        if (selected.toLowerCase() === newVal) { item.classList.add('selected'); }
        else { item.classList.remove('selected'); }
    })
}

function createDropdownItem(text) {
    const dropdownItem = document.createElement('span');
    dropdownItem.className = 'nav-list-item';
    dropdownItem.innerText = text;
    return dropdownItem;
}

function setDropdownItem(selectedValue) {
    navSelectedItem.forEach((item, index) => { item.innerText = selectedValue; })
    localStorage.setItem('selectedItem', selectedValue.toLowerCase());
    dropdownMenu.forEach((item, index) => {
        item.innerHTML = '';
        if (selectedValue.toLowerCase() === corporate) { item.appendChild(createDropdownItem(individual)) }
        else if (selectedValue.toLowerCase() === individual) { item.appendChild(createDropdownItem(corporate)) }
    })
}

dropdownMenu.forEach((item, index) => {
    item.addEventListener('click', function (event) {
        if (event.target.classList.contains('nav-list-item')) {
            const selectedValue = event.target.innerText;
            const type = selectedValue.toLowerCase() === corporate ? 0 : 1;
            handleBody(selectedValue);
            setDropdownItem(selectedValue);
        }
    })
});

function handleBody(type) {
    handleClick(type)
    if (b2bBody || b2cBody) {
        scrollToTop();
        if (type.toLowerCase() == corporate) {
            b2bBody.style.display = 'flex'; b2cBody.style.display = 'none';
            imageResizing(); refreshSlickSliders()
        } else {
            b2bBody.style.display = 'none'; b2cBody.style.display = 'flex';
            imageResizing();
            initializeAccordions(homeAccordions);
            refreshSlickSliders()
        }
    } else {
        const intervalId = setInterval(function () {
            if (b2bBody) { clearInterval(intervalId); handleBody(type); }
        }, 100);
        window.location.href = domainURL;
    }
}
// ---------------------------------------------- //