// ---------------- MICF PAGE ---------------- //
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

// HEAD
function tabStopHandler() {
    Webflow.push(function () {
        let sectionLinks = document.querySelectorAll('.tab-item');
        sectionLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                $(document).off('click')
            })
        })
    })
}

function tabHandler() {
    const tabLinks = document.querySelectorAll(".tab-item");
    const header = document.querySelector(".navbar-3");

    if (header) {
        const headerHeight = header.getBoundingClientRect().height;

        function handleTabLinkClick(targetSection) {
            const isTabBarFixed = document.querySelector('.tabs-menu').classList.contains('fixed');
            const offset = !isTabBarFixed ? -headerHeight - 170 : -190;
            // const offset = isTabBarFixed ? -headerHeight - 190 : -headerHeight - 170; // Adjusted offset
            const targetSectionRect = targetSection.getBoundingClientRect();

            window.scrollTo({
                top: targetSectionRect.top + window.scrollY + offset,
                behavior: "smooth"
            });

            const sectionId = targetSection.id;
            if (sectionId) {
                const updatedUrl = new URL(window.location.href);
                updatedUrl.searchParams.set("section", sectionId);
                window.history.replaceState(null, null, updatedUrl);
            }
        }

        tabLinks.forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const targetSection = document.querySelector(link.getAttribute("href"));
                handleTabLinkClick(targetSection)
                const tabsMenu = document.querySelector('.tabs-menu')
                tabsMenu.classList.add("fixed");
            });
        });
    }
}

function scrollHandler() {
    const tabsMenu = document.querySelector('.tabs-menu');
    const tabContent = document.querySelector('.tabs-content');
    const tabWrapper = document.querySelector('#tab-wrapper');
    const sections = document.querySelectorAll(".tab-content-container");
    const tabLinks = document.querySelectorAll(".tab-item");

    let isTabBarFixed;
    if (tabsMenu) {
        isTabBarFixed = tabsMenu.classList.contains('fixed');

        function obCallback(payload) {
            if (payload[0].isIntersecting && window.scrollY >= 600 && window.innerWidth >= 768) {
                tabsMenu.classList.add("fixed");
                tabWrapper.style.paddingTop = '64px';

            }
            else {
                tabsMenu.classList.remove("fixed");
                tabWrapper.style.paddingTop = '0';
            }
        }

        function animateFadeOut(element) {
            element.style.transition = 'opacity 0.5s'; // Add transition for fading out
            element.style.opacity = '0';
            tabWrapper.style.paddingTop = '0';

            // After the animation duration, remove the fixed class
            setTimeout(() => {
                element.classList.remove("fixed");
                element.style.transition = ''; // Reset transition property
                element.style.opacity = '1'; // Reset opacity
            }, 500); // Adjust the duration (in milliseconds) based on your animation duration
        }

        // function obCallback(payload) {
        //     const scrollPosition = window.scrollY + window.innerHeight;
        //     const bottomOffset = 50; // Adjust this value based on your requirements //finetune bottomoffset value
        //     const bottomThreshold = tabContent.offsetTop + tabContent.offsetHeight - bottomOffset;

        //     if (scrollPosition > bottomThreshold && window.innerWidth >= 768) {
        //         tabsMenu.style.transition = 'opacity 0.5s'; // Add transition for fading out
        //         tabsMenu.style.opacity = '0';
        //         tabWrapper.style.paddingTop = '0';

        //         // After the animation duration, remove the fixed class
        //         setTimeout(() => {
        //             tabsMenu.classList.remove("fixed");
        //             tabsMenu.style.transition = ''; // Reset transition property
        //             tabsMenu.style.opacity = '1'; // Reset opacity
        //         }, 500); // Adjust the duration (in milliseconds) based on your animation duration
        //         // tabsMenu.classList.remove("fixed");
        //         // tabWrapper.style.paddingTop = '0';
        //     }
        //     else {
        //         tabsMenu.classList.add("fixed");
        //         tabWrapper.style.paddingTop = '64px';
        //     }
        // }

        const ob = new IntersectionObserver(obCallback);
        ob.observe(tabContent);
        const options = { threshold: 0.2 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const offset = !isTabBarFixed ? 250 : 200;
                    const targetId = entry.target.id;
                    const targetTabLinks = document.querySelectorAll(`.tab-item[href="#${targetId}"]`);
                    if (entry.boundingClientRect.top <= offset && entry.intersectionRatio > 0) {
                        tabLinks.forEach(link => link.classList.remove("active"));
                        targetTabLinks.forEach(link => link.classList.add("active"));
                    } else {
                        targetTabLinks.forEach(link => link.classList.remove("active"));
                    }
                }
            });
        }, options)
        sections.forEach((section) => {
            observer.observe(section);
        });
    } else {
        // Handle the case where '.tabs-menu' is not found in the DOM
    }
    // const isTabBarFixed = document.querySelector('.tabs-menu').classList.contains('fixed');
}

function removePer(str) {
    if (String(str).includes('%')) return str.replace('%', '')
    else return str
}

function transformData(data, type) {
    return data && Object.entries(data).map(([key, value]) => ({ key, value: type === 'table' ? removePer(value) : Number(value?.toString()?.replace("%", "")) })).filter((item) => item.value > 0);
}

const setTextContent = (elementId, content) => {
    const element = document.getElementById(elementId);
    if (element) { element.textContent = content; }
};

function renderLoop(data) {
    const { performances, currentAssetAllocation, holding, creditRating, distributions } = data;

    const dataMappings = [
        { elementClass: '.asset-allocation', data: currentAssetAllocation },
        { elementClass: '.credit-quality', data: creditRating },
        { elementClass: '.top-holdings', data: holding }
    ];

    const dataMappingsUpdated = [
        { elementClass: '.credit-list', data: creditRating },
        { elementClass: '.holding-list', data: holding }
    ];

    dataMappings.forEach(({ elementClass, data }) => {
        const bodyRow = document.querySelector(elementClass);
        populateTableData(data, bodyRow)
    });

    dataMappingsUpdated.forEach(({ elementClass, data }) => {
        const bodyRow = document.querySelector(elementClass);
        compositionList(data, bodyRow)
    });

    if (performances) {
        const performanceBodyRow = document.querySelector('.performance-body');

        if (performanceBodyRow) {
            performances.forEach(data => {
                const row = document.createElement('div');
                row.classList.add('performance-body-row');
                const html = `
            <div class="performance-body-cell flex-1 right-align">
                <span class="per-body-title">${data.name || '-'}</span>
            </div>
            <div class="performance-body-cell">
                <span class="per-body-title">${data.mtd || '-'}</span>
            </div>
            <div class="performance-body-cell">
                <span class="per-body-title">${data.ytd || '-'}</span>
            </div>
            <div class="performance-body-cell">
                <span class="per-body-title">${data.days90 || '-'}</span>
            </div>
            <div class="performance-body-cell">
                <span class="per-body-title">${data.days365 || '-'}</span>
            </div>`;
                row.innerHTML = html;
                performanceBodyRow.appendChild(row)
            })
        }

    }

    if (distributions) {
        const distributionBodyRow = document.querySelector('.distribution-body');
        if (distributionBodyRow) {
            distributions.forEach((data) => {
                const row = document.createElement('div'); row.classList.add('distribution-body-row');
                const html = `
            <div class="distribution-body-cell flex-1 right-align">
                <span class="dist-body-title">${data.payoutDate ? data.payoutDate.split(' ')[0] : '-'}</span>
            </div>
            <div class="distribution-body-cell">
                <span class="dist-body-title">${data.payoutPerUnit.toFixed(3) || '-'}</span>
            </div>
            <div class="distribution-body-cell">
                <span class="dist-body-title">${data.exNav.toFixed(4) || '-'}</span>
            </div>
            <div class="distribution-body-cell">
                <span class="dist-body-title">${data.yield.toFixed(2) || '-'}</span>
            </div>`;
                row.innerHTML = html;
                distributionBodyRow.appendChild(row)
            })
        }
    }

    function populateTableData(data, container) {
        data.forEach((item) => {
            const row = document.createElement('div');
            row.classList.add('portfolio-body-row');
            const returnVal = typeof (item.value) == 'string' ? item.value : (item.value).toFixed(2)
            const html = `
            <div class="portfolio-body-cell flex-1">
                <span class="port-body-title">${item.key}</span>
            </div>
            <div class="portfolio-body-cell">
                <span class="port-body-title">${returnVal}</span>
            </div>`;

            row.innerHTML = html;
            if (container) { container.appendChild(row) }
        })
    }

    // NEW PERFROMANCE LIST
    if (performances) {
        const performanceContentArea = document.querySelector('.performace-new-table');

        if (performanceContentArea) {
            // Clear existing content by removing all child elements
            while (performanceContentArea.firstChild) {
                performanceContentArea.removeChild(performanceContentArea.firstChild);
            }

            performances.forEach(data => {
                const row = document.createElement('div');
                row.classList.add('table-item');

                const selectedColor = data.name.toLowerCase().includes('micf') ? "#2E90FA" : "#62529B";

                const html = `
                    <div class="div-block-98" style="background-color: ${selectedColor}"></div>
                    <div class="table-content-area">
                        <h3 class="table-title">${data.name || '-'}</h3>
                        <div class="div-block-99">
                            <div class="div-block-100">
                                <div class="text-block-37">MTD</div>
                                <div class="text-block-38">${data.mtd || '-'}</div>
                            </div>
                            <div class="div-block-100">
                                <div class="text-block-37">YTD</div>
                                <div class="text-block-38">${data.ytd || '-'}</div>
                            </div>
                            <div class="div-block-100">
                                <div class="text-block-37">90 DAYS</div>
                                <div class="text-block-38">${data.days90 || '-'}</div>
                            </div>
                            <div>
                                <div class="text-block-37">1Y</div>
                                <div class="text-block-38">${data.days365 || '-'}</div>
                            </div>
                        </div>
                    </div>
                `

                row.innerHTML = html;
                performanceContentArea.appendChild(row)
            })
        }
    }

    // NEW ASSET ALLOCATION LIST
    if (currentAssetAllocation) {
        const portfolioDataContainer = document.querySelector('.portfolio-data-container');

        if (portfolioDataContainer) {
            // Clear existing content by removing all child elements
            while (portfolioDataContainer.firstChild) {
                portfolioDataContainer.removeChild(portfolioDataContainer.firstChild);
            }

            currentAssetAllocation.forEach(data => {
                const row = document.createElement('div');
                row.classList.add('table-item');

                const html = `
                    <div class="table-content-area">
                        <h3 class="table-title">${data.key}</h3>
                        <div style="display: flex; gap: 14px">
                            <div class="div-block-101" style="display: flex;">
                                <svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
                                    <circle cx="3.5" cy="9.04102" r="3" fill="#432F87"/>
                                </svg>
                                <div>
                                    <div class="text-block-37">THIS MONTH</div>
                                    <div class="text-block-38">${data.value}%</div>
                                </div>
                            </div>
                            <div class="div-block-101" style="display: flex;">
                                <svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
                                    <circle cx="3.5" cy="9.04102" r="3" fill="#FF7D84"/>
                                </svg>
                                <div>
                                    <div class="text-block-37">LAST MONTH</div>
                                    <div class="text-block-38">${data.value}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `

                row.innerHTML = html;
                portfolioDataContainer.appendChild(row)
            })
        }
        // <div>
        //     <div class="text-block-37">LAST MONTH</div>
        //     <div class="text-block-38">20%</div>
        // </div>
    }

    // NEW CREDIT & TOP HOLDING LIST
    function compositionList(data, container) {
        if (container) {

            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            const maxItemValue = Math.max(...data.map(item => item.value));
            console.log('maxItemValue', maxItemValue);

            data.forEach((item) => {
                const row = document.createElement('div');
                row.classList.add('table-item');
                row.classList.add('no-min-width');

                const returnVal = typeof (item.value) == 'string' ? item.value : (item.value).toFixed(2)
                const selectedColor = maxItemValue == returnVal ? "#432F87" : "#53B1FD";

                const html = `
                    <div class="div-block-98" style="background-color: ${selectedColor}"></div>
                    <div class="table-content-area">
                        <div class="text-block-37" style="margin-bottom: 2px">${item.key}</div>
                        <div class="text-block-39">${returnVal}%</div>
                    </div>
                `;

                row.innerHTML = html;
                container.appendChild(row)
            })
        }
    }
}

let reportsData;
async function fetchData() {
    // Create the loader
    const loader = createLoader();

    // Display the loader
    loader.style.display = 'flex';

    try {
        const response = await fetch(`${mahaanaWealthCashFund}/api/CashFund/micf`);
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json();

        const { offeringDocumentList, fmrDate, fundInfo, performances, monthToDateExpense, overview, currentAssetAllocation, creditRating, holding, distributions } = data;

        let fmrDateElement = document.querySelectorAll('body #fmrDate');
        Array.from(fmrDateElement).forEach(element => {
            element.textContent = "as of" + " " + moment(fmrDate, 'DD-MMM-YYYY').format('D MMM YYYY')
        });

        const contentMapping = {
            'asset-class': fundInfo.fundCategory,
            'expense-ratio-mtd': `${fundInfo.monthlyTotalExpenseRatio}%`,
            'expense-ratio-ytd': `${fundInfo.yearlyTotalExpenseRatio}%`,
            'micf-mtd': `${monthToDateExpense.key.toFixed(2)}%`,
            'mtd-date': `as of ${moment(monthToDateExpense.value).format('D MMM YYYY')}`,
            'nav-price': `${overview.navPerUnit.includes('.') ? Number(overview.navPerUnit).toFixed(4) : Number(overview.navPerUnit)}`,
            'nav-date': `as of ${moment(overview.navDate, 'YYYY/MM/DD').format('D MMM YYYY')}`,
            'productSummary': overview.assetCategory,
            'fundManager': fundInfo.fundManager,
            'netAssets': fundInfo.netAssets,
            'launchDate': fundInfo.launchDate || '-',
            'fundCategory': fundInfo.fundCategory,
            'investmentObjective': fundInfo.investmentObjective,
            'benchmark': fundInfo.benchmark,
            'managementFee': fundInfo.managementFee,
            'fundAuditors': fundInfo.fundAuditors,
            'fundStabilityRating': fundInfo.fundStabilityRating
        };

        if (offeringDocumentList.length > 0) {
            offeringDocumentList.pop()
        }
        reportsData = offeringDocumentList;

        displayReports(offeringDocumentList);

        offeringDocumentList.length > 5 && renderPagination(offeringDocumentList);

        for (const elementId in contentMapping) {
            setTextContent(elementId, contentMapping[elementId])
        }
        data.currentAssetAllocation = transformData(currentAssetAllocation, 'table');
        data.creditRating = transformData(creditRating, 'table');
        data.holding = transformData(holding, 'table');
        renderLoop(data);

        Object.keys(holding).length && renderHoldingChart(transformData(holding));
        renderCreditChart(transformData(creditRating));

        // const data = [
        //     "currentAssetAllocation": {
        //         "Shariah Compliant Bank Deposits": 39.24,
        //         "GoP Ijarah Sukuks": 57.83,
        //         "Short Term Sukuk": 0.00,
        //         "Certificate of Investments": 0.00,
        //         "Other assets ": 2.93
        //     },
        //     "lastAssetAllocation": {
        //         "Shariah Compliant Bank Deposits": 44.53,
        //         "GoP Ijarah Sukuks": 46.71,
        //         "Short Term Sukuk": 6.80,
        //         "Certificate of Investments": 0.00,
        //         "Other assets ": 1.96
        //     }
        // ]

        currentAssetAllocation && renderAssetChart(transformData(currentAssetAllocation))

    } catch (error) {
        console.error('>>>>>>Error', error)
    }
    // To hide the loader:
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
}

function getFundData(duration) {

    const params = typeof duration == 'object' || duration == undefined ? 3 : duration;

    const url = `${mahaanaWealthCashFund}/api/CashFund/fundperformance?duration=${params}`;

    fetch(url, {
        method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.message || 'Unknown error occurred.')
                });
            }
            return response.json();
        }).then((data) => {
            let totalReturnDate = document.querySelector('#totalReturnsDate');

            renderFundChart(data);

            const lastDate = data[data.length - 1].date;

            if (totalReturnDate) {
                totalReturnDate.textContent = `as of ${moment(lastDate, 'DD/MM/YYYY').format('D MMM YYYY')}`;
            }

        }).catch((error) => {
            console.error('Error occurred:', error)
        })
}
fetchData();
getFundData();

// BODY
var currentUrl = window.location.href;
var updatedUrl = currentUrl.replace(/[?&]section=[^&]+/, '');

if (currentUrl !== updatedUrl) {
    window.history.replaceState(null, null, updatedUrl);
}

$(document).ready(function () {
    $('.tab-item').click(function (event) {
        event.stopPropagation();
    });
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(window).on('load', function () {
        $(".tab-item").removeClass("w--current", "active")
    });
});

document.addEventListener("DOMContentLoaded", function () {
    tabStopHandler();
    tabHandler();
});

document.addEventListener("scroll", scrollHandler)

function getFormattedDate(date) { const navDate = moment(date, "DDMMYYYY").format('DD MMM YYYY'); return "as of " + navDate }

const reportsBodyContainer = document.querySelector('.reports-body');
itemsPerPage = 5;
currentPage = 1;

function displayReports(reportsData) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = reportsData?.slice(startIndex, endIndex) || [];

    if (reportsBodyContainer) {
        reportsBodyContainer.innerHTML = '';
        displayedData.forEach((data) => {
            const url = `${mahaanaWealthCashFund}/api/Document/${data.key.split('.')[0]}`;
            const row = document.createElement('div');
            row.classList.add('reports-body-row');
            const html = `
                <div class="reports-body-cell flex-1 text-right">
                    <span class="rep-body-title">${data.name || data.key}</span>
                </div>
                <a href="${url}" target="_blank" class="reports-body-cell download-doc">
                    <img src="https://uploads-ssl.webflow.com/647f1d0084dd393f468d58a6/6492cec92fe6af1ddd33bcc6_downloadArrow.png" loading="lazy" alt="download">
                    <span class="rep-body-title download">Download</span>
                </a>`;
            row.innerHTML = html; reportsBodyContainer.appendChild(row)
        })
    }

}

function goToPage(page) {
    if (page >= 1 && page <= Math.ceil((reportsData.length || 0) / itemsPerPage)) {
        currentPage = page; window.currentPage = displayReports(reportsData)
    }
}

const graphDur = [
    { key: '1M', value: 0 }, { key: '3M', value: 3 },
    { key: '1Y', value: 12 }, { key: '3Y', value: 12 }
];

const durationContainer = document.getElementById('graph-duration');

if (durationContainer) {
    graphDur.forEach(item => {
        const durationDiv = document.createElement('div');
        durationDiv.className = 'duration';
        durationDiv.textContent = item.key;

        if (item.key === '3M') {
            durationDiv.classList.add('selected')
        }
        durationDiv.addEventListener('click', () => {
            const selectedDiv = document.querySelector('.duration.selected');
            if (selectedDiv) {
                selectedDiv.classList.remove('selected')
            }
            durationDiv.classList.add('selected');
            console.log('item', item)
            getFundData(item.value)
        });

        if (durationContainer) {
            durationContainer.appendChild(durationDiv);
        }
    })
}

const durationContainerNew = document.getElementById('new-graph-duration');

// Clear existing content by removing all child elements
if (durationContainerNew) {
    while (durationContainerNew.firstChild) {
        durationContainerNew.removeChild(durationContainerNew.firstChild);
    }

    graphDur.forEach(item => {
        const durationDiv = document.createElement('div');
        durationDiv.className = 'duration';
        durationDiv.textContent = item.key;

        if (item.key === '3M') {
            durationDiv.classList.add('selected')
        }
        durationDiv.addEventListener('click', () => {
            const selectedDiv = document.querySelector('.duration.selected');
            if (selectedDiv) {
                selectedDiv.classList.remove('selected')
            }
            durationDiv.classList.add('selected');
            console.log('item', item)
            getFundData(item.value)
        });

        if (durationContainerNew) {
            durationContainerNew.appendChild(durationDiv);
        }
    })

    // Create the SVG div
    const svgDiv = document.createElement('div');
    svgDiv.className = 'html-embed-50 w-embed';
    svgDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M4.75 0.75C4.75 0.334375 4.41563 0 4 0C3.58437 0 3.25 0.334375 3.25 0.75V2H2C0.896875 2 0 2.89687 0 4V4.5V6V14C0 15.1031 0.896875 16 2 16H12C13.1031 16 14 15.1031 14 14V6V4.5V4C14 2.89687 13.1031 2 12 2H10.75V0.75C10.75 0.334375 10.4156 0 10 0C9.58438 0 9.25 0.334375 9.25 0.75V2H4.75V0.75ZM1.5 6H12.5V14C12.5 14.275 12.275 14.5 12 14.5H2C1.725 14.5 1.5 14.275 1.5 14V6ZM3 8.75C3 9.16562 3.33437 9.5 3.75 9.5H10.25C10.6656 9.5 11 9.16562 11 8.75C11 8.33438 10.6656 8 10.25 8H3.75C3.33437 8 3 8.33438 3 8.75ZM3.75 11C3.33437 11 3 11.3344 3 11.75C3 12.1656 3.33437 12.5 3.75 12.5H7.25C7.66563 12.5 8 12.1656 8 11.75C8 11.3344 7.66563 11 7.25 11H3.75Z" fill="#667085"></path>
        </svg>
    `;

    // Append the SVG div to the durationContainerNew
    durationContainerNew.appendChild(svgDiv);
}


// ---------------------------------------------- //


// const kFormatter = (num) => { let formattedNumber; num = Math.abs(num); if (num >= 1000000000) { formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'; } else if (num >= 1000000) { formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; } else if (num >= 10000) { formattedNumber = (num / 10000).toFixed(1).replace(/\.0$/, '') + 'K'; } else { formattedNumber = num.toLocaleString(); } return formattedNumber; }


