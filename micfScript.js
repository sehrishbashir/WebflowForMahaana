// ---------------- MICF PAGE ---------------- //

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
    const header = document.querySelector(".navbar-3");
    const headerHeight = header.getBoundingClientRect().height;
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

    dataMappings.forEach(({ elementClass, data }) => {
        const bodyRow = document.querySelector(elementClass);
        populateTableData(data, bodyRow)
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

    if (performances) {
        const performanceContentArea = document.querySelector('.performace-new-table');

        if (performanceContentArea) {

            performances.forEach(data => {
                const row = document.createElement('div');
                row.classList.add('table-item');

                const html = `
                    <div class="div-block-98"></div>
                    <div class="table-content-area">
                        <h3 class="table-title">${data.name || '-'}</h3>
                        <div class="div-block-99">
                            <div class="div-block-100">
                                <div class="text-block-37">MTD</div>
                                <div class="text-block-38">${data.mtd || '-'}</div>
                            </div>
                            <div class="div-block-100">
                                <div class="text-block-37">YD</div>
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
}

let reportsData;
async function fetchData() {
    try {
        const response = await fetch(`${mahaanaWealthCashFund}/api/CashFund/micf`);

        console.log('response', response)
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

        renderAssetChart(transformData(currentAssetAllocation));
        renderCreditChart(transformData(creditRating));

    } catch (error) {
        console.error('>>>>>>Error', error)
    }
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

tippy('.tippy', {
    theme: 'dark', animation: 'fade', duration: 100,
    arrow: true, arrowType: 'sharp', delay: [0, 50],
    maxWidth: 191, interactive: true, theme: 'light-border',
    content: '<p style="margin: 0; font-family: poppins; font-size: 12px; font-weight: 500px; line-height: 14px; color: #fff; text-align: left;">NAV and return values include reinvested dividends</p>',
    allowHTML: true, placement: 'right'
})

function getFormattedDate(date) { const navDate = moment(date, "DDMMYYYY").format('DD MMM YYYY'); return "as of " + navDate }

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

const reportsBodyContainer = document.querySelector('.reports-body');
const itemsPerPage = 5;
let currentPage = 1;

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
                    <span class="rep-body-title">${data.key}</span>
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

    if (durationContainer) { durationContainer.appendChild(durationDiv); }
})
// ---------------------------------------------- //