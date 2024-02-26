// ---------------- MICF PAGE ---------------- //



let reportsData;
itemsPerPage = 5;
currentPage = 1;

const creditChartWrap = document.querySelector('#credit-rating-chart-wrapper .flex-block-23');
const creditList = document.querySelector('#credit-rating-chart-wrapper .credit-list');
const creditChart = document.querySelector('#credit-quality-chart');

const holdingChartWrap = document.querySelector('#top-holding-chart-wrapper .flex-block-23');
const holdingList = document.querySelector('#top-holding-chart-wrapper .holding-list');
const holdingChart = document.querySelector('#top-holdings-chart');

const assetChartWrap = document.querySelector('#asset-allocation-chart-wrapper .flex-block-23');

const distributionBodyRow = document.querySelector('.distribution-body');
const distributionWrap = document.querySelector('.distribution-body .flex-block-23');

const reportsBodyContainer = document.querySelector('.reports-body');
const reportWrap = document.querySelector('.reports-body .flex-block-23');

const poerformanceWrap = document.querySelector('.new-performance-wrap .flex-block-23');

const offeringDocumentWrapper = document.getElementById('offering-document');

const durationContainer = document.getElementById('graph-duration');

// ---------------- LOADER ---------------- //
// function createLoader() {const loaderWrapper = document.createElement('div');loaderWrapper.id = 'loader-wrapper';loaderWrapper.className = 'loader-wrapper';const loaderElement = document.createElement('div');loaderElement.className = 'loader';loaderWrapper.appendChild(loaderElement);document.body.appendChild(loaderWrapper);return loaderWrapper;}
// ---------------------------------------------- //

// YTD & MTD FIELDS
// const ytdMtdField = document.getElementById("ytd-mtd-values");
// const ytdValue = 
// const mtdValue = 
// ytdMtdField.innerText = `${ytdValue} % (MTD)\n${mtdValue} % (YTD)`;


// function tabStopHandler() {Webflow.push(function () {let sectionLinks = document.querySelectorAll('.tab-item');sectionLinks.forEach(function (link) {link.addEventListener('click', function (event) {event.preventDefault();$(document).off('click')})})})}
// function tabHandler() {const tabLinks = document.querySelectorAll(".tab-item"); const header = document.querySelector(".navbar-3"); const headerHeight = header.getBoundingClientRect().height;function handleTabLinkClick(targetSection) {const isTabBarFixed = document.querySelector('.tabs-menu').classList.contains('fixed'); const offset = !isTabBarFixed ? -headerHeight - 170 : -190; const targetSectionRect = targetSection.getBoundingClientRect();window.scrollTo({ top: targetSectionRect.top + window.scrollY + offset, behavior: "smooth" });const sectionId = targetSection.id;if (sectionId) {const updatedUrl = new URL(window.location.href);updatedUrl.searchParams.set("section", sectionId);window.history.replaceState(null, null, updatedUrl);}}tabLinks.forEach(link => {link.addEventListener("click", function (event) {event.preventDefault();const targetSection = document.querySelector(link.getAttribute("href"));handleTabLinkClick(targetSection);const tabsMenu = document.querySelector('.tabs-menu');tabsMenu.classList.add("fixed");});});}
// function scrollHandler() {const tabsMenu = document.querySelector('.tabs-menu');const tabContent = document.querySelector('.tabs-content');const tabWrapper = document.querySelector('#tab-wrapper');const sections = document.querySelectorAll(".tab-content-container");const tabLinks = document.querySelectorAll(".tab-item");let isTabBarFixed;if (tabsMenu) {isTabBarFixed = tabsMenu.classList.contains('fixed');function obCallback(payload) {if (payload[0].isIntersecting && window.scrollY >= 600 && window.innerWidth >= 768) {tabsMenu.classList.add("fixed");tabWrapper.style.paddingTop = '64px';}else {tabsMenu.classList.remove("fixed");tabWrapper.style.paddingTop = '0';}}const ob = new IntersectionObserver(obCallback);ob.observe(tabContent);const options = { threshold: 0.2 };const observer = new IntersectionObserver((entries) => {entries.forEach(entry => {if (entry.isIntersecting) {const offset = !isTabBarFixed ? 250 : 200;const targetId = entry.target.id;const targetTabLinks = document.querySelectorAll(`.tab-item[href="#${targetId}"]`);if (entry.boundingClientRect.top <= offset && entry.intersectionRatio > 0) {tabLinks.forEach(link => link.classList.remove("active"));targetTabLinks.forEach(link => link.classList.add("active"));} else {targetTabLinks.forEach(link => link.classList.remove("active"));}}});}, options);sections.forEach((section) => {observer.observe(section);});} }
// function removePer(str) {if (String(str).includes('%')) return str.replace('%', '');else return str}
// function transformData(data, type) {return data && Object.entries(data).map(([key, value]) => ({ key, value: type === 'table' ? removePer(value) : Number(value?.toString()?.replace("%", "")) })).filter((item) => item.value > 0);}
// const setTextContent = (elementId, content) => {const element = document.getElementById(elementId);if (element) {element.textContent = content;}};

function renderLoop(data) {
    const { performances, currentAssetAllocation, holding, creditRating, distributions, overAllCreditRating } = data; const dataMappings = [{ elementClass: '.asset-allocation', data: currentAssetAllocation }, { elementClass: '.credit-quality', data: creditRating }, { elementClass: '.top-holdings', data: holding }]; const dataMappingsUpdated = [{ elementClass: '.credit-list', data: creditRating }, { elementClass: '.holding-list', data: holding }]; dataMappings.forEach(({ elementClass, data }) => { const bodyRow = document.querySelector(elementClass); populateTableData(data, bodyRow) }); dataMappingsUpdated.forEach(({ elementClass, data }) => { const bodyRow = document.querySelector(elementClass); if (Object.keys(data).length > 0) { compositionList(data, bodyRow) } else { bodyRow.style.display = "none" } }); if (performances) { const performanceBodyRow = document.querySelector('.performance-body'); if (performanceBodyRow) { performances.forEach(data => { const row = document.createElement('div'); row.classList.add('performance-body-row'); const html = `<div class="performance-body-cell flex-1 right-align"><span class="per-body-title">${data.name || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.mtd || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.ytd || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.days90 || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.days365 || '-'}</span></div>`; row.innerHTML = html; performanceBodyRow.appendChild(row) }) } } if (distributions) { distributionWrap.style.display = "none"; if (distributionBodyRow) { distributions.forEach((data) => { const row = document.createElement('div'); row.classList.add('distribution-body-row'); const html = `<div class="distribution-body-cell flex-1 right-align"><span class="dist-body-title">${data.payoutDate ? data.payoutDate.split(' ')[0] : '-'}</span></div><div class="distribution-body-cell"><span class="dist-body-title">${data.payoutPerUnit.toFixed(3) || '-'}</span></div><div class="distribution-body-cell"><span class="dist-body-title">${data.exNav.toFixed(4) || '-'}</span></div><div class="distribution-body-cell"><span class="dist-body-title">${data.yield.toFixed(2) || '-'}</span></div>`; row.innerHTML = html; distributionBodyRow.appendChild(row) }) } }
    function populateTableData(data, container) { data.forEach((item) => { const row = document.createElement('div'); row.classList.add('portfolio-body-row'); const returnVal = typeof (item.value) == 'string' ? item.value : (item.value).toFixed(2); const html = `<div class="portfolio-body-cell flex-1"><span class="port-body-title">${item.key}</span></div><div class="portfolio-body-cell"><span class="port-body-title">${returnVal}</span></div>`; row.innerHTML = html; if (container) { container.appendChild(row) } }) } if (performances) { const performanceContentArea = document.querySelector('.performace-new-table'); if (performanceContentArea) { while (performanceContentArea.firstChild) { performanceContentArea.removeChild(performanceContentArea.firstChild); } performances.forEach(data => { const row = document.createElement('div'); row.classList.add('table-item'); const selectedColor = data.name.toLowerCase().includes('micf') ? "#2E90FA" : "#62529B"; const html = `<div class="div-block-98" style="background-color: ${selectedColor}"></div><div class="table-content-area"><h3 class="table-title">${data.name || '-'}</h3><div class="div-block-99"><div class="div-block-100"><div class="text-block-37">MTD</div><div class="text-block-38">${data.mtd || '-'}</div></div><div class="div-block-100"><div class="text-block-37">YTD</div><div class="text-block-38">${data.ytd || '-'}</div></div><div class="div-block-100"><div class="text-block-37">90 DAYS</div><div class="text-block-38">${data.days90 || '-'}</div></div><div class="div-block-100"><div class="text-block-37">1Y</div><div class="text-block-38">${data.days365 || '-'}</div></div></div></div>`; row.innerHTML = html; performanceContentArea.appendChild(row); }) } }
    if (overAllCreditRating) { const portfolioDataContainer = document.querySelector('.portfolio-data-container'); if (portfolioDataContainer) { while (portfolioDataContainer.firstChild) { portfolioDataContainer.removeChild(portfolioDataContainer.firstChild) } overAllCreditRating.forEach(data => { const row = document.createElement('div'); row.classList.add('table-item'); const html = `<div class="table-content-area"><h3 class="table-title">${data.name}</h3><div style="display: flex; gap: 14px"><div class="div-block-101" style="display: flex;"><svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none"><circle cx="3.5" cy="9.04102" r="3" fill="#432F87"/></svg><div><div class="text-block-37">THIS MONTH</div><div class="text-block-38">${data.current}%</div></div></div><div class="div-block-101" style="display: flex;"><svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none"><circle cx="3.5" cy="9.04102" r="3" fill="#FF7D84"/></svg><div><div class="text-block-37">LAST MONTH</div><div class="text-block-38">${data.last}%</div></div></div></div></div>`; row.innerHTML = html; portfolioDataContainer.appendChild(row) }) } }
    function compositionList(data, container) { if (container) { while (container.firstChild) { container.removeChild(container.firstChild); } data.forEach((item, index) => { const row = document.createElement('div'); row.classList.add('table-item'); row.classList.add('no-min-width'); const returnVal = typeof (item.value) == 'string' ? item.value : (item.value).toFixed(2); const PIE_COLORS = ['#583EB1', '#43BED8', '#9575FF', '#4382D8', '#85EBFF', '#5D9631']; const selectedColor = PIE_COLORS[index]; const html = `<div class="div-block-98" style="background-color: ${selectedColor}"></div><div class="table-content-area"><div class="text-block-37" style="margin-bottom: 2px">${item.key}</div><div class="text-block-39">${returnVal}%</div></div>`; row.innerHTML = html; container.appendChild(row); }) } }
}

const demoData = {
    "id": "65d832484b0efa092190560b",
    "overview": {
        "name": "Mahaana Islamic Index ETF",
        "assetCategory": "MIIETF is a Shariah-compliant equity index fund that primarily invests in the top 30, free float weighted Islamic stocks that have an annual average turnover of more than PKR 10 million. MIIETF provides investors the long term benefits of equity markets.",
        "question": "What is Mahaana Islamic Cash Fund (MICF)?",
        "description": "",
        "navDate": "2024/02/22",
        "navPerUnit": "10735.3598"
    },
    "fundInfo": {
        "netAssets": "PKR 25 mn",
        "launchDate": "Mar 04, 2024",
        "fundCategory": "Open-end Shariah Compliant Equity ETF",
        "investmentObjective": "Investment objective is to provide competitive equity market returns with maximum coverage of the broader Islamic index at lowest possible cost.",
        "benchmark": "Mahaana Islamic Index",
        "managementFee": "Up to 1% of average net assets during the month",
        "monthlyTotalExpenseRatio": 0.20,
        "yearlyTotalExpenseRatio": 0.20,
        "fundAuditors": "BDO Ebrahim & Co.",
        "fundStabilityRating": "N/A",
        "fundManager": "Mahaana Wealth Limited",

        // New
        "Authorized Participant": "JS Global Capital Limited",

        // Not used anymore
        "totalExpenseRatio": null,
        "totalExpenseRatioWithoutLevy": null,
        "monthlyTotalExpenseRatioWithoutLevy": 0.07,
        "yearlyTotalExpenseRatioWithoutLevy": 0.07,
        "weightedAverageTime": "47.00",
        "custodian": "Central Depository Company of Pakistan Limited",
        "shariahAdvisors": "Al Hilal Shariah Advisors"
    },
    "fmrDate": "2024-02-29",

    // New section instead of asset allocation but like credit quality
    "assetAllocation": {
        "Equity": "97.50",
        "Cash": "2.00",
        "Other assets ": "0.50"
    },

    // Not used anymore
    "currentAssetAllocation": {
        "Bank Deposits": 34.22,
        "GoP Ijarah Sukuks": 60.59,
        "Short Term Sukuk": 0.00,
        "Certificate of Investments": 0.00,
        "Other assets ": 5.19
    },
    // Not used anymore
    "lastAssetAllocation": {
        "Bank Deposits": 34.66,
        "GoP Ijarah Sukuks": 61.88,
        "Short Term Sukuk": 0.00,
        "Certificate of Investments": 0.00,
        "Other assets ": 3.46
    },

    // "Credit quality" rename to "Sector allocation"
    "creditRating": {
        "OIL & GAS EXPLORATION COMPANIES": "17.65",
        "CEMENT": "17.09",
        "FERTILIZER": "16.06",
        "TECHNOLOGY & COMMUNICATION": "11.67",
        "POWER GENERATION & DISTRIBUTION": "9.53",
        "Others": "25.50"
    },
    "holding": {
        "Systems Limited": "11",
        "Engro Corporation": "10",
        "Hub Power Energy Company": "10",
        "Lucky Cement Limited": "8",
        "Oil & Gas Development Company": "7",
        "Engro Fertilizers Limited": "6",
        "Pakistan Petroleum Limited": "6",
        "Meezan Bank Limited": "6",
        "Mari Petroleum Limited": "5",
        "Millat Tractors Limited": "4"
    },
    "distribution": {},
    "distributions": [],
    "performances": [
        {
            "name": "MIIETF return (annualized)",
            "lastUpdatedOn": null,
            "mtd": "-7.10%",
            "ytd": "6.45%",
            "days30": null,
            "days90": "-7.10%",
            "days365": null,
            "years3": null,
            "years5": null,
            "inception": null
        },
        {
            "name": "Benchmark return (annualized)",
            "lastUpdatedOn": null,
            "mtd": "-7.05%",
            "ytd": "6.55%",
            "days30": null,
            "days90": "-7.05%",
            "days365": null,
            "years3": null,
            "years5": null,
            "inception": null
        }
    ],
    "benchmarkData": null,
    "monthToDateExpense": {
        "key": 20.356251512386085191877156930,
        "value": "2024-02-22T00:00:00Z"
    },
    "offeringDocumentList": [
        {
            "key": "OfferingDocument.pdf",
            "value": "#",
            "name": "OfferingDocument.pdf"
        }
    ]
}

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

        const {
            offeringDocumentList, fmrDate, fundInfo, performances, monthToDateExpense, overview,
            currentAssetAllocation, lastAssetAllocation, creditRating, holding, distributions
        } = demoData;

        let fmrDateElement = document.querySelectorAll('body #fmrDate');
        Array.from(fmrDateElement).forEach(element => {
            element.textContent = "as of" + " " + moment(fmrDate, 'YYYY-MM-DD').format('D MMM YYYY')
        });

        const contentMapping = {
            'asset-name': overview?.name,
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
            'fundStabilityRating': fundInfo.fundStabilityRating,
            'shahr-e-advisor': fundInfo.shariahAdvisors,
            'custodian': fundInfo.custodian,
            'weightAverageTime': fundInfo.weightedAverageTime,
            'totalMonthlyExpenseRatioWithoutLevy': `${fundInfo.monthlyTotalExpenseRatioWithoutLevy}% (MTD)`,
            'totalYearlyExpenseRatioWithoutLevy': `${fundInfo.yearlyTotalExpenseRatioWithoutLevy}% (YTD)`,
        };

        if (offeringDocumentList.length > 0) {
            offeringDocumentWrapper.href = `${mahaanaWealthCashFund}/api/Document/${offeringDocumentList[offeringDocumentList.length - 1].key.split('.')[0]}`;
            offeringDocumentList.pop();
            if (offeringDocumentList.length > 1) {
                reportWrap.style.display = "none";
            }
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


        const assetAllocationData = {
            "currentAssetAllocation": currentAssetAllocation,
            "lastAssetAllocation": lastAssetAllocation
        };

        const assetClasses = Object.keys(assetAllocationData.currentAssetAllocation);
        const overallAssetAllocationData = assetClasses
            .map(assetClass => ({
                name: assetClass,
                current: assetAllocationData.currentAssetAllocation[assetClass],
                last: assetAllocationData.lastAssetAllocation[assetClass]
            }))
            .filter(data => data.current > 0 || data.last > 0);

        data.overAllCreditRating = overallAssetAllocationData;

        renderLoop(data);

        const sendingPieData = transformData(creditRating)

        if (Object.keys(holding).length > 0) {
            holdingChartWrap.style.display = "none";
            holdingList.style.display = "flex";
            renderHoldingChart(transformData(holding))
        } else {
            holdingChart.style.border = 0
        }

        if (Object.keys(creditRating).length > 0) {
            creditChartWrap.style.display = "none";
            creditList.style.display = "flex";
            renderCreditChart(sendingPieData);
        } else {
            creditChart.style.border = 0;
        }

        if (Object.keys(overallAssetAllocationData).length > 0) {
            assetChartWrap.style.display = "none";
            renderAssetChart(overallAssetAllocationData);
        }
    } catch (error) {
        console.error('>>>>>>Error', error);
        creditChart.style.border = 0;
        holdingChart.style.border = 0;
    }
    setTimeout(() => {
        loader.style.display = 'none';
        const fragmentIdentifier = window.location.hash;

        if (fragmentIdentifier) {
            // Remove the '#' symbol from the fragment identifier
            const targetId = fragmentIdentifier.substring(1);

            // Find the target element by its id
            const targetElement = document.getElementById(targetId);

            // Scroll to the target element if it exists
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
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
            poerformanceWrap.style.display = "none";
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
var currentUrl = window.location.href;var updatedUrl = currentUrl.replace(/[?&]section=[^&]+/, '');if (currentUrl !== updatedUrl) {window.history.replaceState(null, null, updatedUrl);};$(document).ready(function () {$('.tab-item').click(function (event) {event.stopPropagation();});$("html, body").animate({ scrollTop: 0 }, "slow");$(window).on('load', function () {$(".tab-item").removeClass("w--current", "active")});});document.addEventListener("DOMContentLoaded", function () {tabStopHandler();tabHandler();});document.addEventListener("scroll", scrollHandler);

function getFormattedDate(date) { const navDate = moment(date, "DDMMYYYY").format('DD MMM YYYY'); return "as of " + navDate };

function displayReports(reportsData) {const startIndex = (currentPage - 1) * itemsPerPage;const endIndex = startIndex + itemsPerPage;const displayedData = reportsData?.slice(startIndex, endIndex) || [];
if (reportsBodyContainer) {
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

// function goToPage(page) {if (page >= 1 && page <= Math.ceil((reportsData.length || 0) / itemsPerPage)) {currentPage = page; window.currentPage = displayReports(reportsData)}}
// const graphDur = [{ key: '1M', value: 0 }, { key: '3M', value: 3 },{ key: '1Y', value: 12 }, { key: '3Y', value: 12 }];



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
