// ---------------- CREDS SETUP ---------------- //
currentDomain = window.location.hostname;
corporate = window.env.CORPORATE;
individual = window.env.INDIVIDUAL;

mahaanaWealthCashFund = window.env.CASHFUND
mahaanaInvitee = window.env.INVITE_MAHANIERS
domainURL = window.env.DOMAIN_URL

if (!currentDomain.includes('webflow')) {
    mahaanaWealthCashFund = 'https://prod-mahaana-wealth-cashfund.azurewebsites.net'
    mahaanaInvitee = 'https://prod-mahaana-dfa-invitemahaniers.azurewebsites.net'
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
                showElements(cuSuccessModal);
                cuForm.reset()
                setTimeout(() => {
                    hideElements(cuSuccessModal);
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
const blogParaElements2 = document.querySelectorAll('.blogs-para')
const blogTitleElements2 = document.getElementsByClassName('blogs-head');

const paraLimit = 100;
const titleLimit = 50;
truncateText(blogCardParaElements, paraLimit);
truncateText(blogTitleElements, titleLimit);
truncateText(blogParaElements2, paraLimit);
truncateText(blogTitleElements2, titleLimit);

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
    // Create the loader
    const loader = createLoader();

    // Display the loader
    loader.style.display = 'block';

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

        // Hide the loader when your code is complete
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);

    } else {
        const intervalId = setInterval(function () {
            if (b2bBody) {
                clearInterval(intervalId);
                handleBody(type);

                // Hide the loader when your code is complete
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }
        }, 100);
        window.location.href = domainURL;
    }
}
// ---------------------------------------------- //


// ---------------- LOADER ---------------- //
function createLoader() {
    // Create the loader wrapper div
    const loaderWrapper = document.createElement('div');
    loaderWrapper.id = 'loader-wrapper';
    loaderWrapper.className = 'loader-wrapper';

    // Create the inner loader div
    const loaderElement = document.createElement('div');
    loaderElement.className = 'loader';

    // Append the loader element to the loader wrapper
    loaderWrapper.appendChild(loaderElement);

    // Append the loader wrapper to the body
    document.body.appendChild(loaderWrapper);

    return loaderWrapper;
}
// ---------------------------------------------- //


// ---------------- ABOUT US ---------------- //
function handleWindowResize() {
    const windowWidth = window.innerWidth;
    const ourStory = document.getElementById('our-story');

    if (ourStory) {
        const text = `At Mahaana, our journey began with a vision to revolutionize the investment management industry in Pakistan. Recognizing the transformative power of technology in the global financial landscape, our team of renowned investment managers embarked on a mission to bring that innovation to our home country. Through close collaboration with the regulatory body, SECP, we spearheaded the introduction of the Digital AMC framework, marking a significant milestone as the first Digital AMC in Pakistan.<br/><br/>Driven by our commitment to democratize access to financial planning and advice, we combine cutting-edge technology with our team's extensive expertise to provide a comprehensive suite of services. Our goal is to break down the barriers that have traditionally limited access to high-quality financial solutions, making them available to a wider audience at affordable costs.`;

        if (windowWidth <= 991) {
            const characterLimit = 495;

            if (text.length > characterLimit) {
                const truncatedText = text.substring(0, characterLimit);
                const remainingText = text.substring(characterLimit);
                const readMoreElement = document.createElement('span');
                const readLessElement = document.createElement('span');

                readMoreElement.className = 'read-more';
                readMoreElement.innerHTML = ' <a href="#">read more</a>';

                readLessElement.className = 'read-less';
                readLessElement.innerHTML = `${remainingText} <a href="#">read less</a>`;

                document.addEventListener('click', function (event) {
                    if (event.target.matches('span.read-less a')) {
                        ourStory.innerHTML = truncatedText + readMoreElement.outerHTML;
                    } else if (event.target.matches('span.read-more a')) {
                        ourStory.innerHTML = truncatedText + readLessElement.outerHTML;
                    }
                });

                ourStory.innerHTML = truncatedText + readMoreElement.outerHTML;
            }
        }
        else { ourStory.innerHTML = text }
    }
}

handleWindowResize();
window.addEventListener('resize', handleWindowResize);
// ---------------------------------------------- //


// ---------------- HOME ---------------- //
function renderScripts() {
    let windowWidth = window.innerWidth;
    let selectedBox;

    function initializeSelection(windowWidth) {
        const featureTexts = document.querySelectorAll('.feature-text');
        let selectedBox = null;
        selectBox(featureTexts[0]);
        featureTexts.forEach(function (featureText) {
            featureText.addEventListener('click', function () {
                selectBox(featureText);
            })
        });
    }

    function selectBox(box) {
        if (windowWidth > 766) {
            if (selectedBox) {
                selectedBox.style.boxShadow = '';
                selectedBox.querySelector('.feature-count').style.color = '';
            }
            box.style.boxShadow = '0px 20px 25px -5px rgba(0, 0, 0, 0.05)';
            box.querySelector('.feature-count').style.color = '#E5DDFF';
            selectedBox = box;
        } else {
            box.style.boxShadow = '';
            box.querySelector('.feature-count').style.color = '';
            selectedBox = box;
        }
    }

    function handleResize() {
        const windowWidth = window.innerWidth;
        initializeSelection(windowWidth);
    }

    handleResize();
    window.addEventListener('resize', function () {
        handleResize();
    });

    const items = document.querySelectorAll('.sst-list-item');
    items[0].classList.add('selected');
    items.forEach(item => {
        item.addEventListener('click', function () {
            const h3Value = this.querySelector('.sst-item-head').textContent;
            const lowerCaseValue = h3Value.toLowerCase();
            const selectedItemsCount = document.querySelectorAll('.sst-list-item.selected').length;
            if (this.classList.contains('selected') && selectedItemsCount === 1) {
                return;
            }
            window.onSelectRate(lowerCaseValue);
            this.classList.toggle('selected');
        });
    });

    const initRangeInput = document.querySelector('input[type="range"]#initial-slider');
    const initTooltipContainer = document.getElementById('init-tooltip-container');
    const initTooltip = document.querySelector('#init-tooltip-container span');
    const initRange = document.querySelector('.init-range')
    const initInput = document.getElementById('initial-amount');
    const initError = document.getElementById('initial-error');

    const monthlyRangeInput = document.querySelector('input[type="range"]#monthly-slider');
    const monthlyTooltipContainer = document.getElementById('monthly-tooltip-container');
    const monthlyTooltip = document.querySelector('#monthly-tooltip-container span');
    const monthlyRange = document.querySelector('.monthly-range');
    const monthlyInput = document.getElementById('monthly-amount');
    const monthlyError = document.getElementById('monthly-error');

    function calcTransform(percentage) {
        if (percentage <= 0.99) {
            return `translateX(15%)`
        } else if (percentage >= 1 && percentage <= 9.99) {
            return `translateX(-10%)`
        } else if (percentage >= 10) {
            return `translateX(-${(15 + percentage) - 20}%)`
        } else {
            return `translateX(-80%)`
        }
    }

    const currencyFormatted = (value) => {
        if (/^\d{1,3}(,\d{3})*$/.test(value)) {
            return value;
        } else {
            const returnVal = Number(value).toLocaleString('en-PK', {
                minimumFractionDigits: 0, maximumFractionDigits: 0
            });
            return returnVal;
        }
    };

    const currencyFormatted2 = (value) => {
        const numericValue = parseFloat(value.replace(/,/g, ''));
        if (!isNaN(numericValue) && isFinite(numericValue)) {
            const returnVal = numericValue.toLocaleString('en-PK', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            return returnVal;
        } else {
            return value;
        }
    };

    function removeCommaFormatting(amount) {
        if (!amount) { return undefined; }
        if (amount == "0.00" || amount == "0") { return 0; }
        let amountWithoutCommas = amount.toString().replace(/\,/g, "");
        if (amountWithoutCommas.endsWith('.')) { amountWithoutCommas = amountWithoutCommas.replace('.', ''); }
        amountWithoutCommas = amountWithoutCommas.toString().replace('.00', "");
        if (amountWithoutCommas.includes(".")) { return parseFloat(amountWithoutCommas) }
        return parseInt(amountWithoutCommas);
    }

    const validateAndFormat = function (input, error, minValue, maxValue, updateRange) {
        const numericValue = parseFloat(input.value.replace(/,/g, ''));

        if (!input.value.trim()) {
            error.textContent = 'Amount is required';
            input.classList.add('error');
        } else if (isNaN(numericValue) || /[a-zA-Z]/.test(input.value)) {
            error.textContent = 'Only numbers allowed';
            input.classList.add('error');
        } else if (numericValue < minValue || numericValue > maxValue) {
            error.textContent = numericValue < minValue ? `Min ${minValue.toLocaleString()} amount required` : `Max ${maxValue.toLocaleString()} amount allowed`;
            input.classList.add('error');
        } else {
            error.textContent = '';
            input.classList.remove('error');
            const formattedValue = currencyFormatted2(input.value);
            input.value = formattedValue;
            updateRange();
        }
    };

    initInput.addEventListener('input', function () {
        const updateRange = () => {
            const newValue = removeCommaFormatting(this.value);
            updateSliderValues(newValue, initTooltip, initRange, this.value);
            if (initRangeInput) { initRangeInput.value = newValue; }
        }

        if (initRangeInput) { initRangeInput.value = removeCommaFormatting(this.value); }
        initInput.value = this.value;
        validateAndFormat(this, initError, 1000, 9999999, updateRange);

        window.mahaanaChart(removeCommaFormatting(this.value), monthlyRangeInput ? monthlyRangeInput.value : 0)
    });

    monthlyInput.addEventListener('input', function () {
        const updateRange = () => {
            const newValue = removeCommaFormatting(this.value);
            updateSliderValues(newValue, monthlyTooltip, monthlyRange, this.value);
            if (monthlyRangeInput) { monthlyRangeInput.value = newValue; }
        }

        if (monthlyRangeInput) { monthlyRangeInput.value = removeCommaFormatting(this.value); }
        monthlyInput.value = this.value;
        validateAndFormat(this, monthlyError, 500, 999999, updateRange);

        window.mahaanaChart(initRangeInput ? initRangeInput.value : 0, removeCommaFormatting(this.value))
    });

    function updateSliderValues(slider, tooltip, range, rangeInput) {
        const value = removeCommaFormatting(slider.value);
        const rangeMax = parseInt(slider.max, 10);
        const percentage = (value / rangeMax) * 100;
        let containerWidth;
        let left;
        if (tooltip) {
            containerWidth = tooltip.clientWidth;
            left = (percentage * containerWidth) / 100;
            tooltip.style.left = `${percentage}%`;
            tooltip.style.transform = calcTransform(percentage);
            tooltip.textContent = rangeInput;
            range.style.width = `${percentage}%`;
            tooltip.innerHTML = currencyFormatted(value);
        }
    }

    function initializeSliders() {
        const initValue = 1000;
        const monthlyValue = 500;
        initInput.value = currencyFormatted(initValue);
        monthlyInput.value = currencyFormatted(monthlyValue);
        updateSliderValues(initValue, initTooltip, initRange, initValue);
        updateSliderValues(monthlyValue, monthlyTooltip, monthlyRange, monthlyValue);

        if (initRangeInput) { initRangeInput.value = initValue; }
        if (monthlyRangeInput) { monthlyRangeInput.value = monthlyValue; }
    }
    initializeSliders();

    if (initRangeInput) {
        initRangeInput.addEventListener('input', function () {
            updateSliderValues(this, initTooltip, initRange, this.value);
            initInput.value = currencyFormatted(this.value);
            if (monthlyRangeInput) { window.mahaanaChart(this.value, monthlyRangeInput.value) }
        });
    }
    if (monthlyRangeInput) {
        monthlyRangeInput.addEventListener('input', function () {
            updateSliderValues(this, monthlyTooltip, monthlyRange, this.value);
            monthlyInput.value = currencyFormatted(this.value);
            if (initRangeInput) { window.mahaanaChart(initRangeInput.value, this.value) }
        });
    }
}
renderScripts();
// ---------------------------------------------- //

const graphEquatiesOptions = [{ id: 1, title: 'Treasury Bills', category: 'Low Risk', rate: '0.094', type: 'bill', isShown: false }, { id: 2, title: 'Gold', category: 'Moderate', rate: '0.100', type: 'gold', isShown: false }, { id: 3, title: 'Dollars', category: 'Moderate', rate: '0.070', type: 'dollar', isShown: false }, { id: 4, title: 'Equity', category: 'High Risk', rate: '0.168', type: 'equity', isShown: false }];
const graphColorCodes = ['#00338D', '#D1B000', '#85BB65', '#43BED8'];

const { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } = Recharts;
const { debounce } = MaterialUI;

const ContributionChart = ({ amount, amount2 }) => {

    const [initRange, setInitRange] = React.useState(1000);
    const [monthlyRange, setMonthlyRange] = React.useState(500);
    const [selectedRate, setSelectedRate] = React.useState(graphEquatiesOptions)
    const [selectedOpt, setSelectedOpt] = React.useState([])
    const [graphData, setGraphData] = React.useState()
    const [maxFutureValue, setMaxFutureValue] = React.useState(100000);
    const [startingValue, setStartingValue] = React.useState(1000);
    const [retirementAge, setRetirementAge] = React.useState(10);

    React.useEffect(() => { if (amount) { setInitRange(Number(amount)) }; if (amount2) { setMonthlyRange(Number(amount2)) } }, [amount, amount2])
    React.useEffect(() => { handleDebouce(initRange); }, [initRange, monthlyRange, selectedRate]);
    React.useEffect(() => { setSelectedOpt([]); initialSetValues(); handleDebouce(initRange); }, []);

    const initialSetValues = () => { setInitRange(Number(initRange)); setMonthlyRange(Number(monthlyRange)); const array = [...selectedRate]; array[0]['isShown'] = true; setSelectedRate(array); const selectedItemsArr = []; selectedItemsArr.push(array[0]); setSelectedOpt(selectedItemsArr); }

    const onSelectRate = (item) => {
        if (item) {
            const selectedItem = selectedRate.find(rateItem => rateItem.title.toLowerCase() === item);
            if (selectedItem) {
                const updatedSelectedOpt = [...selectedOpt]; const index = updatedSelectedOpt.indexOf(selectedItem); const array = [...selectedRate]; const selectedItem2 = array.find((element) => element.id === selectedItem.id);
                if (selectedOpt.length == 1) { selectedItem2['isShown'] = true } else { selectedItem['isShown'] = !selectedItem2.isShown }
                setSelectedRate(array);
                if (index === -1) { updatedSelectedOpt.push(selectedItem); } else { if (updatedSelectedOpt.length > 1) { updatedSelectedOpt.splice(index, 1); } }
                setSelectedOpt(updatedSelectedOpt);
            }
        }
        else {
            const array = [...selectedRate]; const selectedItem = array.find((element) => element.id === item.id);
            if (selectedOpt.length == 1) { selectedItem['isShown'] = true } else { selectedItem['isShown'] = !selectedItem.isShown }
            setSelectedRate(array)
        }
    }
    window.onSelectRate = onSelectRate;

    const handleDebouce = (initRange) => {
        const initialRange = initRange || 0;
        if (monthlyRange > -1) { const expectedChangeAmount = monthlyRange; debouncedDrawGraph(expectedChangeAmount, retirementAge, initialRange); }
    }

    const debouncedDrawGraph = React.useCallback(debounce((expectedAmount, retirementAge, initRange) => HandleFormulae(expectedAmount, retirementAge, initRange), 1000), [monthlyRange, initRange]);

    const calculateNumberOfPayments = (retirementAge) => { let numberOfPayments; numberOfPayments = retirementAge * 12; if (numberOfPayments < 0) { numberOfPayments = 0; } return numberOfPayments; };

    const HandleFormulae = (expectedAmount, retirementAge, initRange) => { let monthlySelectedSavingValue; monthlySelectedSavingValue = expectedAmount; const numberOfPayments = calculateNumberOfPayments(retirementAge); const total = setGraphDataFunc(numberOfPayments, monthlySelectedSavingValue, initRange); const totalMax = Math.ceil(Number(total.plus(total.times(new Big(Math.random() * 0.1).plus(Math.random() * 0.15))).div(1000).round().times(1000).toString())); setMaxFutureValue(totalMax); }

    const setGraphDataFunc = (numberOfPayments, monthlySavingValue, initRange) => {
        const data = []; let months = numberOfPayments;
        if (months < 0) { months = 0; }

        let startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        if (startDate.getMonth() > 0) { startDate = new Date(startDate.getFullYear() + 1, 0, 1); }

        let bill = monthlySavingReturns('bill', initRange)
        let dollar = monthlySavingReturns('dollar', initRange)
        let gold = monthlySavingReturns('gold', initRange)
        let equity = monthlySavingReturns('equity', initRange)

        data.push({ bill: Number(bill), dollar: Number(dollar), gold: Number(gold), equity: Number(equity), },);

        for (let i = 0; i < months; i++) {
            bill = monthlySavingReturns('bill', bill, monthlySavingValue);
            dollar = monthlySavingReturns('dollar', dollar, monthlySavingValue);
            gold = monthlySavingReturns('gold', gold, monthlySavingValue);
            equity = monthlySavingReturns('equity', equity, monthlySavingValue);

            if (startDate.getMonth() == 10) {
                data.push({
                    year: `${startDate.getFullYear()}`,
                    bill: Number(bill), dollar: Number(dollar),
                    gold: Number(gold), equity: Number(equity),
                });
            }
            startDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
        }

        setGraphData(data); const maxVal = getMaxVal(data[data.length - 1]);
        return maxVal;
    }

    const getMaxVal = (obj) => { const maxVal = Big(Math.max(...Object.keys(obj).filter(key => key !== 'year').map(key => obj[key]))); return maxVal; }

    const monthlySavingReturns = (key, value, monthlySaving) => {
        let returnRate;
        graphEquatiesOptions.find((item) => {
            if (item.type == key) {
                if (item.isShown) {
                    if (monthlySaving) {
                        returnRate = new Big(item.rate).div(12).plus(1).times(value.plus(monthlySaving));
                    } else {
                        let converted = new Big(value);
                        returnRate = converted.plus((converted.times(item.rate).div(12)))
                    }
                }
                else { returnRate = 0 }
            }
        })
        return returnRate;
    }

    const defaultCurrency = 'PKR'; const defaultLocale = 'en-US';
    const currencyFormatOptions = { style: 'currency', currency: defaultCurrency, signDisplay: 'never', currencyDisplay: 'code', maximumFractionDigits: 0, };
    const CurrencyFormatter = (amount, showPrefix = false, showSign = 'auto', hideDecimal = false) => { if (typeof amount !== 'number') { return Number(amount).toLocaleString(defaultLocale, currencyFormatOptions); } const options = { ...currencyFormatOptions }; options.style = showPrefix ? 'currency' : 'decimal'; options.signDisplay = showSign === 'always' || showSign === 'exceptZero' ? 'never' : showSign; options.maximumFractionDigits = hideDecimal ? 0 : 2; return amount.toLocaleString(defaultLocale, options); };

    const CustomTooltip = ({ active, payload }) => { if (active && payload && payload.length) { payload.sort((a, b) => b.value - a.value); return (<div><p style={{ fontFamily: 'Poppins', fontSize: '14px', color: '#677385', marginBottom: 0, lineHeight: '24px', textAlign: 'right', paddingTop: 0 }}>{payload[0].payload.year}</p>{payload.map((item, index) => { const name = item.dataKey == 'bill' ? "Treasury Bill" : item.dataKey; const color = item.fill; return (<p key={String(index)} style={{ fontFamily: 'Poppins', fontSize: '13px', marginBottom: 0, lineHeight: '24px', fontWeight: 500, textAlign: 'right', textTransform: 'capitalize', paddingTop: 0, color: color }}>{`${name}: ${CurrencyFormatter(item.value)}`}</p>) })} </div>); } return null; };

    const kFormatter = (num) => { let formattedNumber; num = Math.abs(num); if (num >= 1000000000) { formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'; } else if (num >= 1000000) { formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; } else if (num >= 100000) { formattedNumber = num.toLocaleString(); } else { formattedNumber = num; } return formattedNumber; }

    return (<div class="calculatorWrapper"><ResponsiveContainer width="100%" height={461}><LineChart width={730} height={100} data={graphData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}><CartesianGrid strokeDasharray="0 0" vertical={false} /><XAxis dataKey="year" axisLine={false} /><YAxis interval={0} minTickGap={0} tickCount={8} orientation="left" axisLine={false} includeHidden tickFormatter={kFormatter} /><Tooltip content={<CustomTooltip />} wrapperStyle={{ backgroundColor: '#fff', borderRadius: '4px', padding: '10px' }} />{selectedRate.map((item, index) => { return (item.isShown && <Line key={String(index)} type="monotone" dataKey={item.type} stroke={graphColorCodes[index]} strokeWidth={2} fillOpacity={1} fill={graphColorCodes[index]} isAnimationActive dot={false} />) })}</LineChart></ResponsiveContainer></div>)
}
ReactDOM.render(<ContributionChart />, document.getElementById('contribution-chart'));
const mahaanaChart = (amount, amount2) => ReactDOM.render(<ContributionChart amount={amount} amount2={amount2} />, document.getElementById('contribution-chart'));
window.mahaanaChart = mahaanaChart;
