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
const assetList = document.querySelector('#asset-allocation-chart-wrapper .assetallocation-list');

const distributionBodyRow = document.querySelector('.distribution-body');
const distributionWrap = document.querySelector('.distribution-body .flex-block-23');

const reportsBodyContainer = document.querySelector('.reports-body');
const reportWrap = document.querySelector('.reports-body .flex-block-23');

const poerformanceWrap = document.querySelector('.new-performance-wrap .flex-block-23');

const offeringDocumentWrapper = document.getElementById('offering-document');

// ---------------- LOADER ---------------- //
function createLoader() { const loaderWrapper = document.createElement('div'); loaderWrapper.id = 'loader-wrapper'; loaderWrapper.className = 'loader-wrapper'; const loaderElement = document.createElement('div'); loaderElement.className = 'loader'; loaderWrapper.appendChild(loaderElement); document.body.appendChild(loaderWrapper); return loaderWrapper; }
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
    const { performances, holding, creditRating, distributions, overAllCreditRating, assetAllocation } = data;

    const dataMappingsUpdated = [
        { elementClass: '.assetallocation-list', data: assetAllocation },
        { elementClass: '.credit-list', data: creditRating },
        { elementClass: '.holding-list', data: holding }
    ];

    dataMappingsUpdated.forEach(({ elementClass, data }) => {
        const bodyRow = document.querySelector(elementClass);
        if (Object.keys(data).length > 0) { compositionList(data, bodyRow) } 
        else { bodyRow.style.display = "none" }
    });

    if (performances) {
        const performanceBodyRow = document.querySelector('.performance-body');
        if (performanceBodyRow) {
            performances.forEach(data => {
                const row = document.createElement('div');
                row.classList.add('performance-body-row');
                const html = `<div class="performance-body-cell flex-1 right-align"><span class="per-body-title">${data.name || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.mtd || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.ytd || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.days90 || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.days365 || '-'}</span></div>`; row.innerHTML = html; performanceBodyRow.appendChild(row)
            })
        }
    }
    if (distributions?.length > 0) {
        distributionWrap.style.display = "none";
        if (distributionBodyRow) {
            distributions.forEach((data) => {
                const row = document.createElement('div');
                row.classList.add('distribution-body-row');
                const html = `<div class="distribution-body-cell flex-1 right-align"><span class="dist-body-title">${data.payoutDate ? data.payoutDate.split(' ')[0] : '-'}</span></div><div class="distribution-body-cell"><span class="dist-body-title">${data.payoutPerUnit.toFixed(3) || '-'}</span></div><div class="distribution-body-cell"><span class="dist-body-title">${data.exNav.toFixed(4) || '-'}</span></div><div class="distribution-body-cell"><span class="dist-body-title">${data.yield.toFixed(2) || '-'}</span></div>`; row.innerHTML = html; distributionBodyRow.appendChild(row)
            })
        }
    }

    if (performances) {
        const performanceContentArea = document.querySelector('.performace-new-table');
        if (performanceContentArea) {

            while (performanceContentArea.firstChild) {
                performanceContentArea.removeChild(performanceContentArea.firstChild);
            }

            performances.forEach(data => {
                const row = document.createElement('div');
                row.classList.add('table-item');
                const selectedColor = data.name.toLowerCase().includes('micf') ? "#2E90FA" : "#62529B";
                const html = `<div class="div-block-98" style="background-color: ${selectedColor}"></div><div class="table-content-area"><h3 class="table-title">${data.name || '-'}</h3><div class="div-block-99"><div class="div-block-100"><div class="text-block-37">MTD</div><div class="text-block-38">${data.mtd || '-'}</div></div><div class="div-block-100"><div class="text-block-37">YTD</div><div class="text-block-38">${data.ytd || '-'}</div></div><div class="div-block-100"><div class="text-block-37">90 DAYS</div><div class="text-block-38">${data.days90 || '-'}</div></div><div class="div-block-100"><div class="text-block-37">1Y</div><div class="text-block-38">${data.days365 || '-'}</div></div></div></div>`; row.innerHTML = html; performanceContentArea.appendChild(row);
            })
        }
    }

    if (assetAllocation) {
        const portfolioDataContainer = document.querySelector('.portfolio-data-container');
        if (portfolioDataContainer) {
            while (portfolioDataContainer.firstChild) {
                portfolioDataContainer.removeChild(portfolioDataContainer.firstChild)
            }
            assetAllocation.forEach((data, index) => {
                const row = document.createElement('div');
                row.classList.add('table-item');
                const returnVal = typeof (data.value) == 'string' ? data.value : (data.value).toFixed(2);
                const PIE_COLORS = ['#583EB1', '#43BED8', '#9575FF', '#4382D8', '#85EBFF', '#5D9631'];
                const selectedColor = PIE_COLORS[index];

                const html = `
                <div class="table-content-area">
                    <div style="display: flex; gap: 14px">
                        <div class="div-block-101" style="display: flex;">
                            <svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none"><circle cx="3.5" cy="9.04102" r="3" fill=${selectedColor}></circle></svg>
                        <div>
                        <div class="text-block-37">${data.key}</div>
                        <div class="text-block-38">${returnVal}%</div>
                    </div>
                </div>
                `; row.innerHTML = html; portfolioDataContainer.appendChild(row)
            })
        }
    }

    function compositionList(data, container) {
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            data.forEach((item, index) => {
                const row = document.createElement('div');
                row.classList.add('table-item');
                row.classList.add('no-min-width');
                const returnVal = typeof (item.value) == 'string' ? item.value : (item.value).toFixed(2);
                const PIE_COLORS = ['#583EB1', '#43BED8', '#9575FF', '#4382D8', '#85EBFF', '#5D9631'];
                const selectedColor = PIE_COLORS[index];
                const html = `<div class="div-block-98" style="background-color: ${selectedColor}"></div><div class="table-content-area"><div class="text-block-37" style="margin-bottom: 2px">${item.key}</div><div class="text-block-39">${returnVal}%</div></div>`; row.innerHTML = html; container.appendChild(row);
            })
        }
    }
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
        "authorizedParticipant": "JS Global Capital Limited",

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
        "key": -7.05,
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
    const loader = createLoader(); loader.style.display = 'flex';
    try {
        const response = await fetch(`${mahaanaWealthCashFund}/api/CashFund/micf`); if (!response.ok) { throw new Error('Network response was not ok') };
        const data = demoData;
        const { offeringDocumentList, fmrDate, fundInfo, monthToDateExpense, overview, creditRating, assetAllocation, holding } = data;
        let fmrDateElement = document.querySelectorAll('body #fmrDate');
        Array.from(fmrDateElement).forEach(element => { element.textContent = "as of" + " " + moment(fmrDate, 'YYYY-MM-DD').format('D MMM YYYY') });

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
            'authorizedParticipant': fundInfo.authorizedParticipant,
            'i-nav': "10,045",
            'market': "10,045"
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
        data.assetAllocation = transformData(assetAllocation, 'table');
        data.creditRating = transformData(creditRating, 'table');
        data.holding = transformData(holding, 'table');


        // const assetAllocationData = {
        //     "currentAssetAllocation": currentAssetAllocation,
        //     "lastAssetAllocation": lastAssetAllocation
        // };

        // const assetClasses = Object.keys(assetAllocationData.currentAssetAllocation);
        // const overallAssetAllocationData = assetClasses
        //     .map(assetClass => ({
        //         name: assetClass,
        //         current: assetAllocationData.currentAssetAllocation[assetClass],
        //         last: assetAllocationData.lastAssetAllocation[assetClass]
        //     }))
        //     .filter(data => data.current > 0 || data.last > 0);

        // data.overAllCreditRating = overallAssetAllocationData;

        renderLoop(data);

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
            renderCreditChart(transformData(creditRating));
        } else {
            creditChart.style.border = 0;
        }

        if (Object.keys(assetAllocation).length > 0) {
            assetChartWrap.style.display = "none";
            assetList.style.display = "flex";
            renderAssetChart(transformData(assetAllocation));
        }


        // if (Object.keys(overallAssetAllocationData).length > 0) {
        //     assetChartWrap.style.display = "none";
        //     renderAssetChart(overallAssetAllocationData);
        // }

    } catch (error) {
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

const demoPerformaceData = [
    {
        "date": "22/11/2017",
        "navValue": 10000,
        "performanceValue": 10000
    },
    {
        "date": "23/11/2017",
        "navValue": 9912.5014,
        "performanceValue": 9907.4342
    },
    {
        "date": "24/11/2017",
        "navValue": 9926.5402,
        "performanceValue": 9925.6941
    },
    {
        "date": "27/11/2017",
        "navValue": 9821.7001,
        "performanceValue": 9814.4849
    },
    {
        "date": "28/11/2017",
        "navValue": 9685.9731,
        "performanceValue": 9678.1808
    },
    {
        "date": "29/11/2017",
        "navValue": 9714.4738,
        "performanceValue": 9705.8002
    },
    {
        "date": "30/11/2017",
        "navValue": 9770.1987,
        "performanceValue": 9745.4555
    },
    {
        "date": "01/12/2017",
        "navValue": 9769.998,
        "performanceValue": 9745.4555
    },
    {
        "date": "04/12/2017",
        "navValue": 9817.9203,
        "performanceValue": 9796.0232
    },
    {
        "date": "05/12/2017",
        "navValue": 9807.7405,
        "performanceValue": 9780.4725
    },
    {
        "date": "06/12/2017",
        "navValue": 9815.3789,
        "performanceValue": 9793.8222
    },
    {
        "date": "07/12/2017",
        "navValue": 9538.4509,
        "performanceValue": 9515.9445
    },
    {
        "date": "08/12/2017",
        "navValue": 9606.8738,
        "performanceValue": 9590.5309
    },
    {
        "date": "11/12/2017",
        "navValue": 9453.9184,
        "performanceValue": 9450.2053
    },
    {
        "date": "12/12/2017",
        "navValue": 9451.9091,
        "performanceValue": 9466.7936
    },
    {
        "date": "13/12/2017",
        "navValue": 9539.6885,
        "performanceValue": 9550.5236
    },
    {
        "date": "14/12/2017",
        "navValue": 9365.164,
        "performanceValue": 9368.2829
    },
    {
        "date": "15/12/2017",
        "navValue": 9503.1123,
        "performanceValue": 9492.003
    },
    {
        "date": "18/12/2017",
        "navValue": 9415.567,
        "performanceValue": 9397.8773
    },
    {
        "date": "19/12/2017",
        "navValue": 9258.6898,
        "performanceValue": 9229.5716
    },
    {
        "date": "20/12/2017",
        "navValue": 9257.932,
        "performanceValue": 9231.4564
    },
    {
        "date": "21/12/2017",
        "navValue": 9387.0223,
        "performanceValue": 9356.7336
    },
    {
        "date": "22/12/2017",
        "navValue": 9592.8714,
        "performanceValue": 9566.0886
    },
    {
        "date": "25/12/2017",
        "navValue": 9592.6743,
        "performanceValue": 9566.0886
    },
    {
        "date": "26/12/2017",
        "navValue": 9602.5002,
        "performanceValue": 9577.5963
    },
    {
        "date": "27/12/2017",
        "navValue": 9811.1342,
        "performanceValue": 9789.3356
    },
    {
        "date": "28/12/2017",
        "navValue": 9843.13,
        "performanceValue": 9822.5136
    },
    {
        "date": "29/12/2017",
        "navValue": 9846.9451,
        "performanceValue": 9819.2477
    },
    {
        "date": "01/01/2018",
        "navValue": 9872.6058,
        "performanceValue": 9841.3158
    },
    {
        "date": "02/01/2018",
        "navValue": 10077.9453,
        "performanceValue": 10043.3162
    },
    {
        "date": "03/01/2018",
        "navValue": 10128.5434,
        "performanceValue": 10113.5491
    },
    {
        "date": "04/01/2018",
        "navValue": 10205.1578,
        "performanceValue": 10193.3949
    },
    {
        "date": "05/01/2018",
        "navValue": 10328.4462,
        "performanceValue": 10320.6543
    },
    {
        "date": "08/01/2018",
        "navValue": 10433.7561,
        "performanceValue": 10417.8741
    },
    {
        "date": "09/01/2018",
        "navValue": 10353.6631,
        "performanceValue": 10339.863
    },
    {
        "date": "10/01/2018",
        "navValue": 10554.404,
        "performanceValue": 10539.4333
    },
    {
        "date": "11/01/2018",
        "navValue": 10473.141,
        "performanceValue": 10467.2511
    },
    {
        "date": "12/01/2018",
        "navValue": 10347.5671,
        "performanceValue": 10328.4754
    },
    {
        "date": "15/01/2018",
        "navValue": 10248.3232,
        "performanceValue": 10222.2767
    },
    {
        "date": "16/01/2018",
        "navValue": 10400.4449,
        "performanceValue": 10377.8925
    },
    {
        "date": "17/01/2018",
        "navValue": 10499.5251,
        "performanceValue": 10487.8137
    },
    {
        "date": "18/01/2018",
        "navValue": 10562.5009,
        "performanceValue": 10532.0658
    },
    {
        "date": "19/01/2018",
        "navValue": 10712.879,
        "performanceValue": 10667.1892
    },
    {
        "date": "22/01/2018",
        "navValue": 10919.1615,
        "performanceValue": 10866.2858
    },
    {
        "date": "23/01/2018",
        "navValue": 10943.8261,
        "performanceValue": 10899.086
    },
    {
        "date": "24/01/2018",
        "navValue": 10938.4045,
        "performanceValue": 10908.5229
    },
    {
        "date": "25/01/2018",
        "navValue": 10863.8104,
        "performanceValue": 10838.2885
    },
    {
        "date": "26/01/2018",
        "navValue": 10845.9518,
        "performanceValue": 10829.3282
    },
    {
        "date": "29/01/2018",
        "navValue": 10744.013,
        "performanceValue": 10713.2703
    },
    {
        "date": "30/01/2018",
        "navValue": 10742.1814,
        "performanceValue": 10706.3479
    },
    {
        "date": "31/01/2018",
        "navValue": 10712.8612,
        "performanceValue": 10677.698
    },
    {
        "date": "01/02/2018",
        "navValue": 10814.9585,
        "performanceValue": 10780.5608
    },
    {
        "date": "02/02/2018",
        "navValue": 10826.1417,
        "performanceValue": 10786.3126
    },
    {
        "date": "05/02/2018",
        "navValue": 10825.9192,
        "performanceValue": 10786.3126
    },
    {
        "date": "06/02/2018",
        "navValue": 10694.5093,
        "performanceValue": 10648.2854
    },
    {
        "date": "07/02/2018",
        "navValue": 10728.7006,
        "performanceValue": 10693.1557
    },
    {
        "date": "08/02/2018",
        "navValue": 10628.9126,
        "performanceValue": 10591.8314
    },
    {
        "date": "09/02/2018",
        "navValue": 10619.6791,
        "performanceValue": 10585.8292
    },
    {
        "date": "12/02/2018",
        "navValue": 10588.496,
        "performanceValue": 10565.1007
    },
    {
        "date": "13/02/2018",
        "navValue": 10577.0311,
        "performanceValue": 10554.9367
    },
    {
        "date": "14/02/2018",
        "navValue": 10442.9961,
        "performanceValue": 10412.038
    },
    {
        "date": "15/02/2018",
        "navValue": 10289.1042,
        "performanceValue": 10244.0471
    },
    {
        "date": "16/02/2018",
        "navValue": 10448.8659,
        "performanceValue": 10411.9879
    },
    {
        "date": "19/02/2018",
        "navValue": 10435.0399,
        "performanceValue": 10411.4154
    },
    {
        "date": "20/02/2018",
        "navValue": 10377.9176,
        "performanceValue": 10356.9121
    },
    {
        "date": "21/02/2018",
        "navValue": 10292.3135,
        "performanceValue": 10274.6748
    },
    {
        "date": "22/02/2018",
        "navValue": 10292.3135,
        "performanceValue": 10479.4301
    },
    {
        "date": "23/02/2018",
        "navValue": 10228.1252,
        "performanceValue": 10410.5897
    },
    {
        "date": "26/02/2018",
        "navValue": 10119.2411,
        "performanceValue": 10303.3719
    },
    {
        "date": "27/02/2018",
        "navValue": 10146.5167,
        "performanceValue": 10337.536
    },
    {
        "date": "28/02/2018",
        "navValue": 10262.2542,
        "performanceValue": 10462.3323
    },
    {
        "date": "01/03/2018",
        "navValue": 10358.6968,
        "performanceValue": 10574.2399
    },
    {
        "date": "02/03/2018",
        "navValue": 10423.6797,
        "performanceValue": 10633.5833
    },
    {
        "date": "05/03/2018",
        "navValue": 10436.063,
        "performanceValue": 10655.2808
    },
    {
        "date": "06/03/2018",
        "navValue": 10418.9122,
        "performanceValue": 10630.6867
    },
    {
        "date": "07/03/2018",
        "navValue": 10353.8583,
        "performanceValue": 10566.8123
    },
    {
        "date": "08/03/2018",
        "navValue": 10240.6746,
        "performanceValue": 10445.9072
    },
    {
        "date": "09/03/2018",
        "navValue": 10240.4224,
        "performanceValue": 10444.0124
    },
    {
        "date": "12/03/2018",
        "navValue": 10378.7675,
        "performanceValue": 10591.6582
    },
    {
        "date": "13/03/2018",
        "navValue": 10423.4174,
        "performanceValue": 10638.8571
    },
    {
        "date": "14/03/2018",
        "navValue": 10363.0189,
        "performanceValue": 10569.4456
    },
    {
        "date": "15/03/2018",
        "navValue": 10383.0929,
        "performanceValue": 10589.928
    },
    {
        "date": "16/03/2018",
        "navValue": 10348.0584,
        "performanceValue": 10557.9264
    },
    {
        "date": "19/03/2018",
        "navValue": 10406.4445,
        "performanceValue": 10620.1893
    },
    {
        "date": "20/03/2018",
        "navValue": 10536.9678,
        "performanceValue": 10763.7078
    },
    {
        "date": "21/03/2018",
        "navValue": 10551.1073,
        "performanceValue": 10790.0464
    },
    {
        "date": "22/03/2018",
        "navValue": 10646.4621,
        "performanceValue": 10884.8319
    },
    {
        "date": "23/03/2018",
        "navValue": 10646.2433,
        "performanceValue": 10884.8319
    },
    {
        "date": "26/03/2018",
        "navValue": 10665.4706,
        "performanceValue": 10916.7447
    },
    {
        "date": "27/03/2018",
        "navValue": 10652.4108,
        "performanceValue": 10906.8313
    },
    {
        "date": "28/03/2018",
        "navValue": 10684.8039,
        "performanceValue": 10942.3692
    },
    {
        "date": "29/03/2018",
        "navValue": 10762.1516,
        "performanceValue": 11022.9349
    },
    {
        "date": "30/03/2018",
        "navValue": 10777.285,
        "performanceValue": 11018.0218
    },
    {
        "date": "02/04/2018",
        "navValue": 10916.9478,
        "performanceValue": 11172.2295
    },
    {
        "date": "03/04/2018",
        "navValue": 11017.5515,
        "performanceValue": 11264.2128
    },
    {
        "date": "04/04/2018",
        "navValue": 10974.9483,
        "performanceValue": 11222.3263
    },
    {
        "date": "05/04/2018",
        "navValue": 11058.6114,
        "performanceValue": 11306.1064
    },
    {
        "date": "06/04/2018",
        "navValue": 11093.0201,
        "performanceValue": 11338.7549
    },
    {
        "date": "09/04/2018",
        "navValue": 11085.3519,
        "performanceValue": 11327.5534
    },
    {
        "date": "10/04/2018",
        "navValue": 11106.355,
        "performanceValue": 11350.7592
    },
    {
        "date": "11/04/2018",
        "navValue": 11098.9698,
        "performanceValue": 11342.3398
    },
    {
        "date": "12/04/2018",
        "navValue": 11096.2192,
        "performanceValue": 11338.8908
    },
    {
        "date": "13/04/2018",
        "navValue": 11026.9848,
        "performanceValue": 11259.7305
    },
    {
        "date": "16/04/2018",
        "navValue": 10908.0583,
        "performanceValue": 11134.104
    },
    {
        "date": "17/04/2018",
        "navValue": 10946.9187,
        "performanceValue": 11172.6159
    },
    {
        "date": "18/04/2018",
        "navValue": 10883.6196,
        "performanceValue": 11095.867
    },
    {
        "date": "19/04/2018",
        "navValue": 10859.3485,
        "performanceValue": 11067.1541
    },
    {
        "date": "20/04/2018",
        "navValue": 10817.9028,
        "performanceValue": 11013.727
    },
    {
        "date": "23/04/2018",
        "navValue": 10825.0481,
        "performanceValue": 11024.1299
    },
    {
        "date": "24/04/2018",
        "navValue": 10935.5011,
        "performanceValue": 11149.6118
    },
    {
        "date": "25/04/2018",
        "navValue": 10892.1644,
        "performanceValue": 11106.0366
    },
    {
        "date": "26/04/2018",
        "navValue": 10829.4488,
        "performanceValue": 11041.1662
    },
    {
        "date": "27/04/2018",
        "navValue": 10796.5649,
        "performanceValue": 11000.7137
    },
    {
        "date": "30/04/2018",
        "navValue": 10821.6866,
        "performanceValue": 11023.7264
    },
    {
        "date": "01/05/2018",
        "navValue": 10821.4642,
        "performanceValue": 11023.7264
    },
    {
        "date": "02/05/2018",
        "navValue": 10755.3013,
        "performanceValue": 10956.1797
    },
    {
        "date": "03/05/2018",
        "navValue": 10677.887,
        "performanceValue": 10875.5123
    },
    {
        "date": "04/05/2018",
        "navValue": 10657.8118,
        "performanceValue": 10861.8307
    },
    {
        "date": "07/05/2018",
        "navValue": 10658.3717,
        "performanceValue": 10859.4679
    },
    {
        "date": "08/05/2018",
        "navValue": 10608.7136,
        "performanceValue": 10809.0347
    },
    {
        "date": "09/05/2018",
        "navValue": 10528.5444,
        "performanceValue": 10725.4994
    },
    {
        "date": "10/05/2018",
        "navValue": 10578.137,
        "performanceValue": 10779.665
    },
    {
        "date": "10/05/2018",
        "navValue": 10578.137,
        "performanceValue": 10779.665
    },
    {
        "date": "11/05/2018",
        "navValue": 10489.6077,
        "performanceValue": 10686.0272
    },
    {
        "date": "14/05/2018",
        "navValue": 10180.0396,
        "performanceValue": 10360.0048
    },
    {
        "date": "15/05/2018",
        "navValue": 10194.2438,
        "performanceValue": 10377.8224
    },
    {
        "date": "16/05/2018",
        "navValue": 10146.0355,
        "performanceValue": 10328.6372
    },
    {
        "date": "17/05/2018",
        "navValue": 10042.543,
        "performanceValue": 10213.2348
    },
    {
        "date": "18/05/2018",
        "navValue": 9959.5684,
        "performanceValue": 10125.7638
    },
    {
        "date": "21/05/2018",
        "navValue": 9936.488,
        "performanceValue": 10104.7233
    },
    {
        "date": "22/05/2018",
        "navValue": 10253.7708,
        "performanceValue": 10439.0435
    },
    {
        "date": "23/05/2018",
        "navValue": 10235.9375,
        "performanceValue": 10412.8194
    },
    {
        "date": "24/05/2018",
        "navValue": 10173.6476,
        "performanceValue": 10347.5754
    },
    {
        "date": "25/05/2018",
        "navValue": 10056.0701,
        "performanceValue": 10238.4986
    },
    {
        "date": "28/05/2018",
        "navValue": 10052.075,
        "performanceValue": 10228.0756
    },
    {
        "date": "29/05/2018",
        "navValue": 10179.6802,
        "performanceValue": 10350.5092
    },
    {
        "date": "30/05/2018",
        "navValue": 10196.8431,
        "performanceValue": 10366.5536
    },
    {
        "date": "31/05/2018",
        "navValue": 10271.4046,
        "performanceValue": 10444.7179
    },
    {
        "date": "01/06/2018",
        "navValue": 10279.8776,
        "performanceValue": 10454.5498
    },
    {
        "date": "04/06/2018",
        "navValue": 10386.5914,
        "performanceValue": 10563.5708
    },
    {
        "date": "05/06/2018",
        "navValue": 10491.1376,
        "performanceValue": 10668.2039
    },
    {
        "date": "06/06/2018",
        "navValue": 10498.8935,
        "performanceValue": 10690.521
    },
    {
        "date": "07/06/2018",
        "navValue": 10465.3087,
        "performanceValue": 10661.2944
    },
    {
        "date": "08/06/2018",
        "navValue": 10465.0937,
        "performanceValue": 10661.2944
    },
    {
        "date": "11/06/2018",
        "navValue": 10438.84,
        "performanceValue": 10642.7526
    },
    {
        "date": "12/06/2018",
        "navValue": 10282.0774,
        "performanceValue": 10478.9435
    },
    {
        "date": "13/06/2018",
        "navValue": 10341.2977,
        "performanceValue": 10534.4959
    },
    {
        "date": "14/06/2018",
        "navValue": 10427.3799,
        "performanceValue": 10598.9341
    },
    {
        "date": "15/06/2018",
        "navValue": 10427.1656,
        "performanceValue": 10598.9341
    },
    {
        "date": "18/06/2018",
        "navValue": 10426.9513,
        "performanceValue": 10598.9341
    },
    {
        "date": "19/06/2018",
        "navValue": 10430.1577,
        "performanceValue": 10593.9395
    },
    {
        "date": "20/06/2018",
        "navValue": 10283.2918,
        "performanceValue": 10462.6787
    },
    {
        "date": "21/06/2018",
        "navValue": 10149.0143,
        "performanceValue": 10340.2394
    },
    {
        "date": "22/06/2018",
        "navValue": 9920.87,
        "performanceValue": 10110.86
    },
    {
        "date": "25/06/2018",
        "navValue": 9683.7827,
        "performanceValue": 9870.8129
    },
    {
        "date": "26/06/2018",
        "navValue": 9763.9271,
        "performanceValue": 9953.564
    },
    {
        "date": "27/06/2018",
        "navValue": 9939.0114,
        "performanceValue": 10130.5352
    },
    {
        "date": "28/06/2018",
        "navValue": 10046.0881,
        "performanceValue": 10227.2685
    },
    {
        "date": "29/06/2018",
        "navValue": 9989.7531,
        "performanceValue": 10169.6911
    },
    {
        "date": "02/07/2018",
        "navValue": 9921.7858,
        "performanceValue": 10107.9576
    },
    {
        "date": "03/07/2018",
        "navValue": 9870.337,
        "performanceValue": 10061.0765
    },
    {
        "date": "04/07/2018",
        "navValue": 9545.8724,
        "performanceValue": 9716.8457
    },
    {
        "date": "05/07/2018",
        "navValue": 9553.708,
        "performanceValue": 9708.6496
    },
    {
        "date": "06/07/2018",
        "navValue": 9559.0812,
        "performanceValue": 9719.3402
    },
    {
        "date": "09/07/2018",
        "navValue": 9309.0913,
        "performanceValue": 9455.9656
    },
    {
        "date": "10/07/2018",
        "navValue": 9360.1165,
        "performanceValue": 9505.0435
    },
    {
        "date": "11/07/2018",
        "navValue": 9423.9235,
        "performanceValue": 9572.5745
    },
    {
        "date": "12/07/2018",
        "navValue": 9476.2858,
        "performanceValue": 9643.128
    },
    {
        "date": "13/07/2018",
        "navValue": 9462.4666,
        "performanceValue": 9607.8763
    },
    {
        "date": "16/07/2018",
        "navValue": 9285.2399,
        "performanceValue": 9441.9248
    },
    {
        "date": "17/07/2018",
        "navValue": 9360.1781,
        "performanceValue": 9502.5534
    },
    {
        "date": "18/07/2018",
        "navValue": 9591.1901,
        "performanceValue": 9740.7414
    },
    {
        "date": "19/07/2018",
        "navValue": 9846.1137,
        "performanceValue": 10001.5299
    },
    {
        "date": "20/07/2018",
        "navValue": 9696.0391,
        "performanceValue": 9859.0089
    },
    {
        "date": "23/07/2018",
        "navValue": 9478.2288,
        "performanceValue": 9646.9706
    },
    {
        "date": "24/07/2018",
        "navValue": 9732.0016,
        "performanceValue": 9914.6257
    },
    {
        "date": "25/07/2018",
        "navValue": 9731.8017,
        "performanceValue": 9914.6257
    },
    {
        "date": "26/07/2018",
        "navValue": 9958.2717,
        "performanceValue": 10147.5185
    },
    {
        "date": "27/07/2018",
        "navValue": 10138.9033,
        "performanceValue": 10328.7932
    },
    {
        "date": "27/07/2018",
        "navValue": 10138.9033,
        "performanceValue": 10328.7932
    },
    {
        "date": "30/07/2018",
        "navValue": 10348.8265,
        "performanceValue": 10551.482
    },
    {
        "date": "31/07/2018",
        "navValue": 10143.0344,
        "performanceValue": 10352.9908
    },
    {
        "date": "01/08/2018",
        "navValue": 10190.7244,
        "performanceValue": 10424.8022
    },
    {
        "date": "02/08/2018",
        "navValue": 10097.5914,
        "performanceValue": 10342.7997
    },
    {
        "date": "03/08/2018",
        "navValue": 10137.8267,
        "performanceValue": 10387.7573
    },
    {
        "date": "06/08/2018",
        "navValue": 10235.5606,
        "performanceValue": 10504.6266
    },
    {
        "date": "07/08/2018",
        "navValue": 10269.8191,
        "performanceValue": 10513.4882
    },
    {
        "date": "08/08/2018",
        "navValue": 10253.9871,
        "performanceValue": 10490.3124
    },
    {
        "date": "09/08/2018",
        "navValue": 10330.8158,
        "performanceValue": 10577.656
    },
    {
        "date": "10/08/2018",
        "navValue": 10311.5552,
        "performanceValue": 10542.5259
    },
    {
        "date": "13/08/2018",
        "navValue": 10233.9371,
        "performanceValue": 10455.6217
    },
    {
        "date": "14/08/2018",
        "navValue": 10233.7268,
        "performanceValue": 10455.6217
    },
    {
        "date": "15/08/2018",
        "navValue": 10181.8483,
        "performanceValue": 10396.4672
    },
    {
        "date": "16/08/2018",
        "navValue": 10073.103,
        "performanceValue": 10269.6129
    },
    {
        "date": "17/08/2018",
        "navValue": 10201.7507,
        "performanceValue": 10395.5613
    },
    {
        "date": "20/08/2018",
        "navValue": 10203.4548,
        "performanceValue": 10405.9471
    },
    {
        "date": "21/08/2018",
        "navValue": 10203.2451,
        "performanceValue": 10405.9471
    },
    {
        "date": "22/08/2018",
        "navValue": 10203.0355,
        "performanceValue": 10405.9471
    },
    {
        "date": "23/08/2018",
        "navValue": 10202.8258,
        "performanceValue": 10405.9471
    },
    {
        "date": "24/08/2018",
        "navValue": 10247.5587,
        "performanceValue": 10442.9877
    },
    {
        "date": "27/08/2018",
        "navValue": 10274.0981,
        "performanceValue": 10485.511
    },
    {
        "date": "28/08/2018",
        "navValue": 10232.817,
        "performanceValue": 10418.4795
    },
    {
        "date": "29/08/2018",
        "navValue": 10131.4988,
        "performanceValue": 10306.7437
    },
    {
        "date": "30/08/2018",
        "navValue": 10006.8597,
        "performanceValue": 10179.5487
    },
    {
        "date": "31/08/2018",
        "navValue": 9963.9911,
        "performanceValue": 10134.9259
    },
    {
        "date": "03/09/2018",
        "navValue": 9942.5992,
        "performanceValue": 10103.5984
    },
    {
        "date": "04/09/2018",
        "navValue": 10002.7207,
        "performanceValue": 10168.2843
    },
    {
        "date": "05/09/2018",
        "navValue": 9945.6944,
        "performanceValue": 10115.3466
    },
    {
        "date": "06/09/2018",
        "navValue": 9809.2939,
        "performanceValue": 9967.9111
    },
    {
        "date": "07/09/2018",
        "navValue": 9684.449,
        "performanceValue": 9843.8389
    },
    {
        "date": "10/09/2018",
        "navValue": 9655.2743,
        "performanceValue": 9811.5282
    },
    {
        "date": "11/09/2018",
        "navValue": 9710.9078,
        "performanceValue": 9870.4093
    },
    {
        "date": "12/09/2018",
        "navValue": 9662.956,
        "performanceValue": 9824.1994
    },
    {
        "date": "13/09/2018",
        "navValue": 9811.0016,
        "performanceValue": 9979.436
    },
    {
        "date": "14/09/2018",
        "navValue": 9785.5991,
        "performanceValue": 9946.9679
    },
    {
        "date": "17/09/2018",
        "navValue": 9674.7407,
        "performanceValue": 9827.7658
    },
    {
        "date": "18/09/2018",
        "navValue": 9896.9466,
        "performanceValue": 10049.0979
    },
    {
        "date": "19/09/2018",
        "navValue": 9901.9588,
        "performanceValue": 10062.1527
    },
    {
        "date": "20/09/2018",
        "navValue": 9901.7554,
        "performanceValue": 10062.1527
    },
    {
        "date": "21/09/2018",
        "navValue": 9901.5519,
        "performanceValue": 10062.1527
    },
    {
        "date": "24/09/2018",
        "navValue": 9786.786,
        "performanceValue": 9943.1811
    },
    {
        "date": "25/09/2018",
        "navValue": 9845.1485,
        "performanceValue": 9999.2157
    },
    {
        "date": "26/09/2018",
        "navValue": 9786.4663,
        "performanceValue": 9944.4992
    },
    {
        "date": "27/09/2018",
        "navValue": 9761.3284,
        "performanceValue": 9899.6317
    },
    {
        "date": "28/09/2018",
        "navValue": 9772.6363,
        "performanceValue": 9907.8492
    },
    {
        "date": "01/10/2018",
        "navValue": 9737.4529,
        "performanceValue": 9875.1621
    },
    {
        "date": "02/10/2018",
        "navValue": 9758.2318,
        "performanceValue": 9909.2203
    },
    {
        "date": "03/10/2018",
        "navValue": 9695.1368,
        "performanceValue": 9845.8453
    },
    {
        "date": "04/10/2018",
        "navValue": 9583.5157,
        "performanceValue": 9735.6022
    },
    {
        "date": "05/10/2018",
        "navValue": 9369.6645,
        "performanceValue": 9512.4783
    },
    {
        "date": "08/10/2018",
        "navValue": 9028.4904,
        "performanceValue": 9162.7677
    },
    {
        "date": "09/10/2018",
        "navValue": 9227.7421,
        "performanceValue": 9394.7803
    },
    {
        "date": "10/10/2018",
        "navValue": 9284.1732,
        "performanceValue": 9455.0025
    },
    {
        "date": "11/10/2018",
        "navValue": 9165.6667,
        "performanceValue": 9338.6856
    },
    {
        "date": "12/10/2018",
        "navValue": 8913.2331,
        "performanceValue": 9073.6223
    },
    {
        "date": "15/10/2018",
        "navValue": 8715.7955,
        "performanceValue": 8885.4682
    },
    {
        "date": "16/10/2018",
        "navValue": 8697.0137,
        "performanceValue": 8881.1089
    },
    {
        "date": "17/10/2018",
        "navValue": 8982.1856,
        "performanceValue": 9169.6385
    },
    {
        "date": "18/10/2018",
        "navValue": 9087.0433,
        "performanceValue": 9288.0392
    },
    {
        "date": "19/10/2018",
        "navValue": 9171.5985,
        "performanceValue": 9354.1662
    },
    {
        "date": "22/10/2018",
        "navValue": 9109.7351,
        "performanceValue": 9288.3426
    },
    {
        "date": "23/10/2018",
        "navValue": 8953.8762,
        "performanceValue": 9134.9736
    },
    {
        "date": "24/10/2018",
        "navValue": 9365.2782,
        "performanceValue": 9560.4342
    },
    {
        "date": "25/10/2018",
        "navValue": 9527.2673,
        "performanceValue": 9713.182
    },
    {
        "date": "26/10/2018",
        "navValue": 9800.3549,
        "performanceValue": 10009.414
    },
    {
        "date": "29/10/2018",
        "navValue": 10022.8781,
        "performanceValue": 10234.1594
    },
    {
        "date": "30/10/2018",
        "navValue": 10022.8781,
        "performanceValue": 10264.4651
    },
    {
        "date": "31/10/2018",
        "navValue": 10029.7682,
        "performanceValue": 10266.7706
    },
    {
        "date": "01/11/2018",
        "navValue": 10061.821,
        "performanceValue": 10284.0545
    },
    {
        "date": "02/11/2018",
        "navValue": 10103.4713,
        "performanceValue": 10321.5301
    },
    {
        "date": "05/11/2018",
        "navValue": 9936.3777,
        "performanceValue": 10190.9148
    },
    {
        "date": "06/11/2018",
        "navValue": 9798.2901,
        "performanceValue": 10064.8791
    },
    {
        "date": "07/11/2018",
        "navValue": 9984.4994,
        "performanceValue": 10245.4367
    },
    {
        "date": "08/11/2018",
        "navValue": 9918.6694,
        "performanceValue": 10195.5989
    },
    {
        "date": "09/11/2018",
        "navValue": 9916.7164,
        "performanceValue": 10199.8336
    },
    {
        "date": "12/11/2018",
        "navValue": 9814.7256,
        "performanceValue": 10092.7189
    },
    {
        "date": "13/11/2018",
        "navValue": 9811.1416,
        "performanceValue": 10102.1801
    },
    {
        "date": "14/11/2018",
        "navValue": 9779.6861,
        "performanceValue": 10051.6826
    },
    {
        "date": "15/11/2018",
        "navValue": 9874.7084,
        "performanceValue": 10144.4287
    },
    {
        "date": "16/11/2018",
        "navValue": 9945.9081,
        "performanceValue": 10204.6236
    },
    {
        "date": "19/11/2018",
        "navValue": 9884.5039,
        "performanceValue": 10133.0454
    },
    {
        "date": "20/11/2018",
        "navValue": 9923.6446,
        "performanceValue": 10162.2291
    },
    {
        "date": "21/11/2018",
        "navValue": 9923.4407,
        "performanceValue": 10162.2291
    },
    {
        "date": "22/11/2018",
        "navValue": 9778.2596,
        "performanceValue": 10011.565
    },
    {
        "date": "23/11/2018",
        "navValue": 9758.4052,
        "performanceValue": 9986.0035
    },
    {
        "date": "26/11/2018",
        "navValue": 9703.2724,
        "performanceValue": 9941.0086
    },
    {
        "date": "27/11/2018",
        "navValue": 9708.0284,
        "performanceValue": 9958.6488
    },
    {
        "date": "28/11/2018",
        "navValue": 9646.4042,
        "performanceValue": 9896.1583
    },
    {
        "date": "29/11/2018",
        "navValue": 9612.4187,
        "performanceValue": 9858.166
    },
    {
        "date": "30/11/2018",
        "navValue": 9555.2761,
        "performanceValue": 9787.3806
    },
    {
        "date": "03/12/2018",
        "navValue": 9230.7294,
        "performanceValue": 9437.5069
    },
    {
        "date": "04/12/2018",
        "navValue": 9326.9107,
        "performanceValue": 9537.2913
    },
    {
        "date": "05/12/2018",
        "navValue": 9266.9313,
        "performanceValue": 9488.896
    },
    {
        "date": "06/12/2018",
        "navValue": 9009.6314,
        "performanceValue": 9219.8656
    },
    {
        "date": "07/12/2018",
        "navValue": 9076.034,
        "performanceValue": 9268.6387
    },
    {
        "date": "10/12/2018",
        "navValue": 9301.8814,
        "performanceValue": 9506.0782
    },
    {
        "date": "11/12/2018",
        "navValue": 9187.6878,
        "performanceValue": 9380.8239
    },
    {
        "date": "12/12/2018",
        "navValue": 9071.8935,
        "performanceValue": 9276.3525
    },
    {
        "date": "13/12/2018",
        "navValue": 8970.218,
        "performanceValue": 9159.8109
    },
    {
        "date": "14/12/2018",
        "navValue": 9118.6651,
        "performanceValue": 9321.2801
    },
    {
        "date": "17/12/2018",
        "navValue": 9057.9669,
        "performanceValue": 9256.6701
    },
    {
        "date": "18/12/2018",
        "navValue": 8998.5476,
        "performanceValue": 9198.1167
    },
    {
        "date": "19/12/2018",
        "navValue": 8939.0027,
        "performanceValue": 9137.4652
    },
    {
        "date": "20/12/2018",
        "navValue": 8991.8404,
        "performanceValue": 9202.4545
    },
    {
        "date": "21/12/2018",
        "navValue": 8975.0114,
        "performanceValue": 9182.1338
    },
    {
        "date": "24/12/2018",
        "navValue": 8992.6183,
        "performanceValue": 9191.8154
    },
    {
        "date": "25/12/2018",
        "navValue": 8992.4335,
        "performanceValue": 9191.8154
    },
    {
        "date": "26/12/2018",
        "navValue": 8952.3011,
        "performanceValue": 9145.7629
    },
    {
        "date": "27/12/2018",
        "navValue": 8864.932,
        "performanceValue": 9036.0507
    },
    {
        "date": "28/12/2018",
        "navValue": 8660.961,
        "performanceValue": 8793.389
    },
    {
        "date": "31/12/2018",
        "navValue": 8639.1991,
        "performanceValue": 8754.7598
    },
    {
        "date": "01/01/2019",
        "navValue": 8919.2042,
        "performanceValue": 9068.8366
    },
    {
        "date": "02/01/2019",
        "navValue": 8829.5926,
        "performanceValue": 8996.4555
    },
    {
        "date": "03/01/2019",
        "navValue": 8760.9683,
        "performanceValue": 8918.1238
    },
    {
        "date": "04/01/2019",
        "navValue": 8746.6122,
        "performanceValue": 8898.5888
    },
    {
        "date": "07/01/2019",
        "navValue": 9040.3398,
        "performanceValue": 9221.7776
    },
    {
        "date": "08/01/2019",
        "navValue": 9231.9247,
        "performanceValue": 9422.5472
    },
    {
        "date": "09/01/2019",
        "navValue": 9220.2454,
        "performanceValue": 9400.4419
    },
    {
        "date": "10/01/2019",
        "navValue": 9291.6973,
        "performanceValue": 9467.2516
    },
    {
        "date": "11/01/2019",
        "navValue": 9267.5436,
        "performanceValue": 9432.787
    },
    {
        "date": "14/01/2019",
        "navValue": 9349.2045,
        "performanceValue": 9523.1087
    },
    {
        "date": "15/01/2019",
        "navValue": 9426.1711,
        "performanceValue": 9607.9264
    },
    {
        "date": "16/01/2019",
        "navValue": 9301.6115,
        "performanceValue": 9481.6731
    },
    {
        "date": "17/01/2019",
        "navValue": 9290.4067,
        "performanceValue": 9465.3095
    },
    {
        "date": "18/01/2019",
        "navValue": 9295.6858,
        "performanceValue": 9478.8881
    },
    {
        "date": "21/01/2019",
        "navValue": 9327.8445,
        "performanceValue": 9511.7541
    },
    {
        "date": "22/01/2019",
        "navValue": 9395.5101,
        "performanceValue": 9590.4164
    },
    {
        "date": "23/01/2019",
        "navValue": 9423.5234,
        "performanceValue": 9612.4559
    },
    {
        "date": "24/01/2019",
        "navValue": 9453.8649,
        "performanceValue": 9637.8772
    },
    {
        "date": "25/01/2019",
        "navValue": 9419.3219,
        "performanceValue": 9586.8715
    },
    {
        "date": "25/01/2019",
        "navValue": 9419.3219,
        "performanceValue": 9586.8715
    },
    {
        "date": "28/01/2019",
        "navValue": 9462.2817,
        "performanceValue": 9643.7376
    },
    {
        "date": "29/01/2019",
        "navValue": 9538.5135,
        "performanceValue": 9722.5488
    },
    {
        "date": "30/01/2019",
        "navValue": 9520.0431,
        "performanceValue": 9709.8761
    },
    {
        "date": "31/01/2019",
        "navValue": 9573.0092,
        "performanceValue": 9769.9594
    },
    {
        "date": "01/02/2019",
        "navValue": 9623.8867,
        "performanceValue": 9817.5947
    },
    {
        "date": "04/02/2019",
        "navValue": 9807.2085,
        "performanceValue": 9989.1262
    },
    {
        "date": "05/02/2019",
        "navValue": 9807.007,
        "performanceValue": 9989.1262
    },
    {
        "date": "06/02/2019",
        "navValue": 9784.4316,
        "performanceValue": 9964.4191
    },
    {
        "date": "07/02/2019",
        "navValue": 9745.2303,
        "performanceValue": 9928.449
    },
    {
        "date": "08/02/2019",
        "navValue": 9613.9828,
        "performanceValue": 9792.6458
    },
    {
        "date": "11/02/2019",
        "navValue": 9472.2037,
        "performanceValue": 9643.7577
    },
    {
        "date": "12/02/2019",
        "navValue": 9610.5762,
        "performanceValue": 9782.2285
    },
    {
        "date": "13/02/2019",
        "navValue": 9609.4326,
        "performanceValue": 9782.7781
    },
    {
        "date": "14/02/2019",
        "navValue": 9588.3723,
        "performanceValue": 9750.2999
    },
    {
        "date": "15/02/2019",
        "navValue": 9565.2388,
        "performanceValue": 9730.0322
    },
    {
        "date": "18/02/2019",
        "navValue": 9512.7246,
        "performanceValue": 9668.1986
    },
    {
        "date": "19/02/2019",
        "navValue": 9458.2163,
        "performanceValue": 9615.8148
    },
    {
        "date": "20/02/2019",
        "navValue": 9531.4007,
        "performanceValue": 9704.3176
    },
    {
        "date": "21/02/2019",
        "navValue": 9496.7278,
        "performanceValue": 9669.8287
    },
    {
        "date": "22/02/2019",
        "navValue": 9503.0387,
        "performanceValue": 9668.7267
    },
    {
        "date": "25/02/2019",
        "navValue": 9417.0087,
        "performanceValue": 9582.4965
    },
    {
        "date": "26/02/2019",
        "navValue": 9192.9526,
        "performanceValue": 9340.7593
    },
    {
        "date": "27/02/2019",
        "navValue": 9158.1011,
        "performanceValue": 9297.6779
    },
    {
        "date": "28/02/2019",
        "navValue": 9238.4435,
        "performanceValue": 9375.367
    },
    {
        "date": "01/03/2019",
        "navValue": 9345.9553,
        "performanceValue": 9478.901
    },
    {
        "date": "04/03/2019",
        "navValue": 9375.8535,
        "performanceValue": 9506.6221
    },
    {
        "date": "05/03/2019",
        "navValue": 9347.7214,
        "performanceValue": 9471.6995
    },
    {
        "date": "06/03/2019",
        "navValue": 9314.953,
        "performanceValue": 9437.4052
    },
    {
        "date": "07/03/2019",
        "navValue": 9221.0648,
        "performanceValue": 9345.0541
    },
    {
        "date": "08/03/2019",
        "navValue": 9110.4181,
        "performanceValue": 9214.0753
    },
    {
        "date": "11/03/2019",
        "navValue": 9094.2409,
        "performanceValue": 9184.04
    },
    {
        "date": "12/03/2019",
        "navValue": 9109.9406,
        "performanceValue": 9212.0588
    },
    {
        "date": "13/03/2019",
        "navValue": 9100.6676,
        "performanceValue": 9207.004
    },
    {
        "date": "14/03/2019",
        "navValue": 9057.54,
        "performanceValue": 9146.0692
    },
    {
        "date": "15/03/2019",
        "navValue": 8902.8557,
        "performanceValue": 8976.7788
    },
    {
        "date": "18/03/2019",
        "navValue": 9019.6878,
        "performanceValue": 9102.1634
    },
    {
        "date": "19/03/2019",
        "navValue": 8953.7292,
        "performanceValue": 9032.085
    },
    {
        "date": "20/03/2019",
        "navValue": 8929.6798,
        "performanceValue": 9007.3865
    },
    {
        "date": "21/03/2019",
        "navValue": 8866.9935,
        "performanceValue": 8941.4785
    },
    {
        "date": "22/03/2019",
        "navValue": 8921.989,
        "performanceValue": 9011.7715
    },
    {
        "date": "25/03/2019",
        "navValue": 8779.9998,
        "performanceValue": 8859.6119
    },
    {
        "date": "26/03/2019",
        "navValue": 8852.6901,
        "performanceValue": 8942.9282
    },
    {
        "date": "27/03/2019",
        "navValue": 9064.2962,
        "performanceValue": 9170.9323
    },
    {
        "date": "28/03/2019",
        "navValue": 8936.0321,
        "performanceValue": 9017.8867
    },
    {
        "date": "29/03/2019",
        "navValue": 8976.6072,
        "performanceValue": 9061.0841
    },
    {
        "date": "01/04/2019",
        "navValue": 8902.7182,
        "performanceValue": 8974.6837
    },
    {
        "date": "02/04/2019",
        "navValue": 8824.7021,
        "performanceValue": 8901.8432
    },
    {
        "date": "03/04/2019",
        "navValue": 8864.5924,
        "performanceValue": 8949.0377
    },
    {
        "date": "04/04/2019",
        "navValue": 8715.6126,
        "performanceValue": 8798.1661
    },
    {
        "date": "05/04/2019",
        "navValue": 8730.6082,
        "performanceValue": 8820.1483
    },
    {
        "date": "08/04/2019",
        "navValue": 8541.6807,
        "performanceValue": 8623.0782
    },
    {
        "date": "09/04/2019",
        "navValue": 8608.7976,
        "performanceValue": 8681.958
    },
    {
        "date": "10/04/2019",
        "navValue": 8440.9458,
        "performanceValue": 8499.6443
    },
    {
        "date": "11/04/2019",
        "navValue": 8509.3213,
        "performanceValue": 8579.6848
    },
    {
        "date": "12/04/2019",
        "navValue": 8654.9623,
        "performanceValue": 8735.4881
    },
    {
        "date": "15/04/2019",
        "navValue": 8688.0668,
        "performanceValue": 8779.4826
    },
    {
        "date": "16/04/2019",
        "navValue": 8647.6714,
        "performanceValue": 8735.1132
    },
    {
        "date": "17/04/2019",
        "navValue": 8534.453,
        "performanceValue": 8627.4045
    },
    {
        "date": "18/04/2019",
        "navValue": 8541.6634,
        "performanceValue": 8628.5595
    },
    {
        "date": "19/04/2019",
        "navValue": 8624.1891,
        "performanceValue": 8721.9639
    },
    {
        "date": "22/04/2019",
        "navValue": 8523.6777,
        "performanceValue": 8628.7269
    },
    {
        "date": "23/04/2019",
        "navValue": 8379.7216,
        "performanceValue": 8483.0889
    },
    {
        "date": "24/04/2019",
        "navValue": 8400.0412,
        "performanceValue": 8506.9545
    },
    {
        "date": "25/04/2019",
        "navValue": 8430.1936,
        "performanceValue": 8550.7215
    },
    {
        "date": "26/04/2019",
        "navValue": 8526.8723,
        "performanceValue": 8648.6669
    },
    {
        "date": "29/04/2019",
        "navValue": 8526.8723,
        "performanceValue": 8591.1611
    },
    {
        "date": "30/04/2019",
        "navValue": 8415.8858,
        "performanceValue": 8474.213
    },
    {
        "date": "01/05/2019",
        "navValue": 8415.7129,
        "performanceValue": 8474.213
    },
    {
        "date": "02/05/2019",
        "navValue": 8364.2795,
        "performanceValue": 8422.3416
    },
    {
        "date": "03/05/2019",
        "navValue": 8227.157,
        "performanceValue": 8283.3755
    },
    {
        "date": "06/05/2019",
        "navValue": 8053.7554,
        "performanceValue": 8108.7313
    },
    {
        "date": "07/05/2019",
        "navValue": 7968.9298,
        "performanceValue": 8018.5856
    },
    {
        "date": "08/05/2019",
        "navValue": 7782.387,
        "performanceValue": 7835.5406
    },
    {
        "date": "09/05/2019",
        "navValue": 7801.9024,
        "performanceValue": 7865.3397
    },
    {
        "date": "10/05/2019",
        "navValue": 7718.5582,
        "performanceValue": 7785.5396
    },
    {
        "date": "13/05/2019",
        "navValue": 7513.0894,
        "performanceValue": 7551.8081
    },
    {
        "date": "14/05/2019",
        "navValue": 7492.1952,
        "performanceValue": 7561.7989
    },
    {
        "date": "15/05/2019",
        "navValue": 7685.5895,
        "performanceValue": 7770.0118
    },
    {
        "date": "16/05/2019",
        "navValue": 7603.5285,
        "performanceValue": 7700.4043
    },
    {
        "date": "17/05/2019",
        "navValue": 7342.4794,
        "performanceValue": 7436.6261
    },
    {
        "date": "20/05/2019",
        "navValue": 7371.1783,
        "performanceValue": 7450.3937
    },
    {
        "date": "21/05/2019",
        "navValue": 7507.5455,
        "performanceValue": 7612.5569
    },
    {
        "date": "22/05/2019",
        "navValue": 7875.403,
        "performanceValue": 7995.2252
    },
    {
        "date": "23/05/2019",
        "navValue": 8121.7834,
        "performanceValue": 8237.0812
    },
    {
        "date": "24/05/2019",
        "navValue": 8132.0369,
        "performanceValue": 8220.4714
    },
    {
        "date": "27/05/2019",
        "navValue": 8173.8943,
        "performanceValue": 8245.6165
    },
    {
        "date": "28/05/2019",
        "navValue": 7957.1733,
        "performanceValue": 8013.9415
    },
    {
        "date": "29/05/2019",
        "navValue": 8288.014,
        "performanceValue": 8348.6825
    },
    {
        "date": "30/05/2019",
        "navValue": 8280.7295,
        "performanceValue": 8334.0248
    },
    {
        "date": "31/05/2019",
        "navValue": 8280.5594,
        "performanceValue": 8334.0248
    },
    {
        "date": "03/06/2019",
        "navValue": 8065.5285,
        "performanceValue": 8090.4657
    },
    {
        "date": "04/06/2019",
        "navValue": 8065.3628,
        "performanceValue": 8090.4657
    },
    {
        "date": "05/06/2019",
        "navValue": 8065.1971,
        "performanceValue": 8090.4657
    },
    {
        "date": "06/06/2019",
        "navValue": 8065.0313,
        "performanceValue": 8090.4657
    },
    {
        "date": "07/06/2019",
        "navValue": 8064.8656,
        "performanceValue": 8090.4657
    },
    {
        "date": "10/06/2019",
        "navValue": 7789.0327,
        "performanceValue": 7801.8474
    },
    {
        "date": "11/06/2019",
        "navValue": 7825.0258,
        "performanceValue": 7851.2387
    },
    {
        "date": "12/06/2019",
        "navValue": 7907.532,
        "performanceValue": 7948.065
    },
    {
        "date": "13/06/2019",
        "navValue": 8067.6879,
        "performanceValue": 8103.5792
    },
    {
        "date": "14/06/2019",
        "navValue": 8143.5965,
        "performanceValue": 8166.7051
    },
    {
        "date": "17/06/2019",
        "navValue": 8038.117,
        "performanceValue": 8057.9432
    },
    {
        "date": "18/06/2019",
        "navValue": 7896.4915,
        "performanceValue": 7906.4361
    },
    {
        "date": "19/06/2019",
        "navValue": 7924.6915,
        "performanceValue": 7933.549
    },
    {
        "date": "20/06/2019",
        "navValue": 8032.894,
        "performanceValue": 8046.3396
    },
    {
        "date": "21/06/2019",
        "navValue": 8096.6574,
        "performanceValue": 8115.4219
    },
    {
        "date": "24/06/2019",
        "navValue": 7866.5105,
        "performanceValue": 7891.8972
    },
    {
        "date": "25/06/2019",
        "navValue": 7808.079,
        "performanceValue": 7838.8508
    },
    {
        "date": "26/06/2019",
        "navValue": 7782.4426,
        "performanceValue": 7814.6489
    },
    {
        "date": "27/06/2019",
        "navValue": 7697.0572,
        "performanceValue": 7714.8215
    },
    {
        "date": "28/06/2019",
        "navValue": 7746.73,
        "performanceValue": 7745.0872
    },
    {
        "date": "01/07/2019",
        "navValue": 7748.4518,
        "performanceValue": 7760.157
    },
    {
        "date": "02/07/2019",
        "navValue": 7838.5229,
        "performanceValue": 7852.5067
    },
    {
        "date": "03/07/2019",
        "navValue": 7997.4279,
        "performanceValue": 8021.6596
    },
    {
        "date": "04/07/2019",
        "navValue": 7867.7718,
        "performanceValue": 7888.7101
    },
    {
        "date": "05/07/2019",
        "navValue": 7759.1921,
        "performanceValue": 7777.0186
    },
    {
        "date": "08/07/2019",
        "navValue": 7621.6402,
        "performanceValue": 7645.3128
    },
    {
        "date": "09/07/2019",
        "navValue": 7661.3229,
        "performanceValue": 7689.5291
    },
    {
        "date": "10/07/2019",
        "navValue": 7657.2732,
        "performanceValue": 7687.1792
    },
    {
        "date": "11/07/2019",
        "navValue": 7665.7091,
        "performanceValue": 7705.4562
    },
    {
        "date": "12/07/2019",
        "navValue": 7589.8203,
        "performanceValue": 7625.928
    },
    {
        "date": "12/07/2019",
        "navValue": 7589.8203,
        "performanceValue": 7625.928
    },
    {
        "date": "15/07/2019",
        "navValue": 7390.262,
        "performanceValue": 7425.2758
    },
    {
        "date": "16/07/2019",
        "navValue": 7362.9816,
        "performanceValue": 7404.4313
    },
    {
        "date": "17/07/2019",
        "navValue": 7351.6027,
        "performanceValue": 7400.7018
    },
    {
        "date": "18/07/2019",
        "navValue": 7155.3504,
        "performanceValue": 7213.4493
    },
    {
        "date": "19/07/2019",
        "navValue": 7240.3526,
        "performanceValue": 7299.4333
    },
    {
        "date": "22/07/2019",
        "navValue": 7275.0079,
        "performanceValue": 7342.4403
    },
    {
        "date": "23/07/2019",
        "navValue": 7317.6089,
        "performanceValue": 7385.1897
    },
    {
        "date": "24/07/2019",
        "navValue": 7225.9837,
        "performanceValue": 7292.8057
    },
    {
        "date": "25/07/2019",
        "navValue": 7236.1166,
        "performanceValue": 7299.6723
    },
    {
        "date": "26/07/2019",
        "navValue": 7146.2696,
        "performanceValue": 7215.387
    },
    {
        "date": "29/07/2019",
        "navValue": 7054.9067,
        "performanceValue": 7125.9884
    },
    {
        "date": "30/07/2019",
        "navValue": 7062.2348,
        "performanceValue": 7126.7669
    },
    {
        "date": "31/07/2019",
        "navValue": 7174.9166,
        "performanceValue": 7237.156
    },
    {
        "date": "01/08/2019",
        "navValue": 7164.7548,
        "performanceValue": 7229.2848
    },
    {
        "date": "02/08/2019",
        "navValue": 7131.4622,
        "performanceValue": 7195.2295
    },
    {
        "date": "05/08/2019",
        "navValue": 7021.58,
        "performanceValue": 7081.6017
    },
    {
        "date": "06/08/2019",
        "navValue": 6997.9891,
        "performanceValue": 7062.7293
    },
    {
        "date": "07/08/2019",
        "navValue": 6800.8044,
        "performanceValue": 6870.216
    },
    {
        "date": "08/08/2019",
        "navValue": 6661.6393,
        "performanceValue": 6731.9154
    },
    {
        "date": "09/08/2019",
        "navValue": 6562.0973,
        "performanceValue": 6634.229
    },
    {
        "date": "12/08/2019",
        "navValue": 6561.9624,
        "performanceValue": 6634.229
    },
    {
        "date": "13/08/2019",
        "navValue": 6561.8276,
        "performanceValue": 6634.229
    },
    {
        "date": "14/08/2019",
        "navValue": 6561.6928,
        "performanceValue": 6634.229
    },
    {
        "date": "15/08/2019",
        "navValue": 6561.5579,
        "performanceValue": 6634.229
    },
    {
        "date": "16/08/2019",
        "navValue": 6346.5916,
        "performanceValue": 6430.0076
    },
    {
        "date": "19/08/2019",
        "navValue": 6549.9188,
        "performanceValue": 6637.3546
    },
    {
        "date": "20/08/2019",
        "navValue": 6743.461,
        "performanceValue": 6825.8379
    },
    {
        "date": "21/08/2019",
        "navValue": 6911.6302,
        "performanceValue": 6990.354
    },
    {
        "date": "22/08/2019",
        "navValue": 7188.0109,
        "performanceValue": 7259.4674
    },
    {
        "date": "23/08/2019",
        "navValue": 7075.9504,
        "performanceValue": 7137.9383
    },
    {
        "date": "26/08/2019",
        "navValue": 6797.9949,
        "performanceValue": 6859.5769
    },
    {
        "date": "27/08/2019",
        "navValue": 6809.0204,
        "performanceValue": 6893.7152
    },
    {
        "date": "28/08/2019",
        "navValue": 6853.4574,
        "performanceValue": 6918.3794
    },
    {
        "date": "29/08/2019",
        "navValue": 6682.6516,
        "performanceValue": 6755.4533
    },
    {
        "date": "30/08/2019",
        "navValue": 6524.2809,
        "performanceValue": 6615.6057
    },
    {
        "date": "02/09/2019",
        "navValue": 6611.7957,
        "performanceValue": 6688.688
    },
    {
        "date": "03/09/2019",
        "navValue": 6551.4555,
        "performanceValue": 6632.1396
    },
    {
        "date": "04/09/2019",
        "navValue": 6749.7521,
        "performanceValue": 6828.5642
    },
    {
        "date": "05/09/2019",
        "navValue": 6725.7773,
        "performanceValue": 6801.792
    },
    {
        "date": "06/09/2019",
        "navValue": 6764.4396,
        "performanceValue": 6840.165
    },
    {
        "date": "09/09/2019",
        "navValue": 6764.3006,
        "performanceValue": 6840.165
    },
    {
        "date": "10/09/2019",
        "navValue": 6764.1617,
        "performanceValue": 6840.165
    },
    {
        "date": "11/09/2019",
        "navValue": 6874.7215,
        "performanceValue": 6932.851
    },
    {
        "date": "12/09/2019",
        "navValue": 7023.3779,
        "performanceValue": 7078.7151
    },
    {
        "date": "13/09/2019",
        "navValue": 7058.7075,
        "performanceValue": 7115.1389
    },
    {
        "date": "16/09/2019",
        "navValue": 7208.8098,
        "performanceValue": 7258.7146
    },
    {
        "date": "17/09/2019",
        "navValue": 7208.0084,
        "performanceValue": 7259.008
    },
    {
        "date": "18/09/2019",
        "navValue": 7084.7632,
        "performanceValue": 7128.0335
    },
    {
        "date": "19/09/2019",
        "navValue": 7272.7595,
        "performanceValue": 7315.1171
    },
    {
        "date": "20/09/2019",
        "navValue": 7243.5201,
        "performanceValue": 7300.0587
    },
    {
        "date": "23/09/2019",
        "navValue": 7133.3699,
        "performanceValue": 7184.33
    },
    {
        "date": "24/09/2019",
        "navValue": 7159.9777,
        "performanceValue": 7217.342
    },
    {
        "date": "25/09/2019",
        "navValue": 7121.7347,
        "performanceValue": 7173.0283
    },
    {
        "date": "26/09/2019",
        "navValue": 7091.9211,
        "performanceValue": 7142.3448
    },
    {
        "date": "27/09/2019",
        "navValue": 7256.7408,
        "performanceValue": 7304.6126
    },
    {
        "date": "30/09/2019",
        "navValue": 7287.3732,
        "performanceValue": 7320.3708
    },
    {
        "date": "01/10/2019",
        "navValue": 7336.9642,
        "performanceValue": 7376.8906
    },
    {
        "date": "02/10/2019",
        "navValue": 7340.7494,
        "performanceValue": 7371.5653
    },
    {
        "date": "03/10/2019",
        "navValue": 7441.9156,
        "performanceValue": 7478.3709
    },
    {
        "date": "04/10/2019",
        "navValue": 7518.5632,
        "performanceValue": 7557.1964
    },
    {
        "date": "07/10/2019",
        "navValue": 7678.3324,
        "performanceValue": 7708.0837
    },
    {
        "date": "08/10/2019",
        "navValue": 7620.886,
        "performanceValue": 7652.2194
    },
    {
        "date": "09/10/2019",
        "navValue": 7623.9657,
        "performanceValue": 7654.8484
    },
    {
        "date": "10/10/2019",
        "navValue": 7756.5144,
        "performanceValue": 7795.9025
    },
    {
        "date": "11/10/2019",
        "navValue": 7882.8611,
        "performanceValue": 7918.0183
    },
    {
        "date": "14/10/2019",
        "navValue": 7814.1637,
        "performanceValue": 7861.6989
    },
    {
        "date": "15/10/2019",
        "navValue": 7814.1637,
        "performanceValue": 7815.3616
    },
    {
        "date": "16/10/2019",
        "navValue": 7860.1645,
        "performanceValue": 7850.8537
    },
    {
        "date": "17/10/2019",
        "navValue": 7763.8612,
        "performanceValue": 7756.7595
    },
    {
        "date": "18/10/2019",
        "navValue": 7808.5848,
        "performanceValue": 7812.4879
    },
    {
        "date": "21/10/2019",
        "navValue": 7611.9303,
        "performanceValue": 7624.318
    },
    {
        "date": "22/10/2019",
        "navValue": 7631.4564,
        "performanceValue": 7656.9808
    },
    {
        "date": "23/10/2019",
        "navValue": 7719.4424,
        "performanceValue": 7741.412
    },
    {
        "date": "24/10/2019",
        "navValue": 7801.8459,
        "performanceValue": 7834.3656
    },
    {
        "date": "25/10/2019",
        "navValue": 7812.578,
        "performanceValue": 7838.2369
    },
    {
        "date": "28/10/2019",
        "navValue": 7863.5419,
        "performanceValue": 7893.5545
    },
    {
        "date": "29/10/2019",
        "navValue": 7841.9557,
        "performanceValue": 7865.3855
    },
    {
        "date": "30/10/2019",
        "navValue": 7807.3353,
        "performanceValue": 7847.024
    },
    {
        "date": "31/10/2019",
        "navValue": 7933.435,
        "performanceValue": 7991.7661
    },
    {
        "date": "01/11/2019",
        "navValue": 7960.1278,
        "performanceValue": 8025.9645
    },
    {
        "date": "04/11/2019",
        "navValue": 8174.351,
        "performanceValue": 8237.6279
    },
    {
        "date": "05/11/2019",
        "navValue": 8213.1475,
        "performanceValue": 8273.7812
    },
    {
        "date": "06/11/2019",
        "navValue": 8273.6302,
        "performanceValue": 8356.7598
    },
    {
        "date": "07/11/2019",
        "navValue": 8289.7498,
        "performanceValue": 8362.8321
    },
    {
        "date": "08/11/2019",
        "navValue": 8349.6696,
        "performanceValue": 8435.7298
    },
    {
        "date": "11/11/2019",
        "navValue": 8565.6433,
        "performanceValue": 8646.4658
    },
    {
        "date": "12/11/2019",
        "navValue": 8515.6165,
        "performanceValue": 8583.5818
    },
    {
        "date": "13/11/2019",
        "navValue": 8606.4593,
        "performanceValue": 8668.9919
    },
    {
        "date": "14/11/2019",
        "navValue": 8630.6689,
        "performanceValue": 8691.7054
    },
    {
        "date": "15/11/2019",
        "navValue": 8682.8918,
        "performanceValue": 8761.499
    },
    {
        "date": "18/11/2019",
        "navValue": 8880.4644,
        "performanceValue": 8951.734
    },
    {
        "date": "19/11/2019",
        "navValue": 8891.6361,
        "performanceValue": 8978.9384
    },
    {
        "date": "20/11/2019",
        "navValue": 8731.0088,
        "performanceValue": 8828.7423
    },
    {
        "date": "21/11/2019",
        "navValue": 8485.1019,
        "performanceValue": 8582.9521
    },
    {
        "date": "22/11/2019",
        "navValue": 8703.619,
        "performanceValue": 8803.4112
    },
    {
        "date": "25/11/2019",
        "navValue": 8767.5251,
        "performanceValue": 8852.3818
    },
    {
        "date": "26/11/2019",
        "navValue": 8659.6517,
        "performanceValue": 8761.5205
    },
    {
        "date": "27/11/2019",
        "navValue": 8679.5393,
        "performanceValue": 8781.6665
    },
    {
        "date": "28/11/2019",
        "navValue": 8808.2596,
        "performanceValue": 8913.3295
    },
    {
        "date": "29/11/2019",
        "navValue": 8891.548,
        "performanceValue": 8975.2103
    },
    {
        "date": "02/12/2019",
        "navValue": 8944.9508,
        "performanceValue": 9048.6705
    },
    {
        "date": "03/12/2019",
        "navValue": 8850.5902,
        "performanceValue": 8958.6292
    },
    {
        "date": "04/12/2019",
        "navValue": 8947.2281,
        "performanceValue": 9055.8218
    },
    {
        "date": "05/12/2019",
        "navValue": 9058.3581,
        "performanceValue": 9155.1597
    },
    {
        "date": "06/12/2019",
        "navValue": 9114.4151,
        "performanceValue": 9189.3853
    },
    {
        "date": "09/12/2019",
        "navValue": 9090.6472,
        "performanceValue": 9159.9827
    },
    {
        "date": "10/12/2019",
        "navValue": 9156.5558,
        "performanceValue": 9233.4199
    },
    {
        "date": "11/12/2019",
        "navValue": 9117.5854,
        "performanceValue": 9186.2096
    },
    {
        "date": "12/12/2019",
        "navValue": 9118.4528,
        "performanceValue": 9189.6
    },
    {
        "date": "13/12/2019",
        "navValue": 9271.2661,
        "performanceValue": 9323.8261
    },
    {
        "date": "16/12/2019",
        "navValue": 9508.2095,
        "performanceValue": 9561.6392
    },
    {
        "date": "17/12/2019",
        "navValue": 9614.8614,
        "performanceValue": 9682.5572
    },
    {
        "date": "18/12/2019",
        "navValue": 9502.9166,
        "performanceValue": 9607.9249
    },
    {
        "date": "19/12/2019",
        "navValue": 9285.0525,
        "performanceValue": 9360.9555
    },
    {
        "date": "20/12/2019",
        "navValue": 9342.0767,
        "performanceValue": 9427.612
    },
    {
        "date": "23/12/2019",
        "navValue": 9142.5534,
        "performanceValue": 9207.5593
    },
    {
        "date": "24/12/2019",
        "navValue": 9272.4041,
        "performanceValue": 9331.6244
    },
    {
        "date": "25/12/2019",
        "navValue": 9272.2136,
        "performanceValue": 9331.6244
    },
    {
        "date": "26/12/2019",
        "navValue": 9454.0397,
        "performanceValue": 9522.4519
    },
    {
        "date": "27/12/2019",
        "navValue": 9392.3309,
        "performanceValue": 9438.7391
    },
    {
        "date": "30/12/2019",
        "navValue": 9464.2412,
        "performanceValue": 9508.7201
    },
    {
        "date": "31/12/2019",
        "navValue": 9414.3386,
        "performanceValue": 9449.9978
    },
    {
        "date": "01/01/2020",
        "navValue": 9569.198,
        "performanceValue": 9598.4594
    },
    {
        "date": "02/01/2020",
        "navValue": 9793.2661,
        "performanceValue": 9884.6692
    },
    {
        "date": "03/01/2020",
        "navValue": 9759.2268,
        "performanceValue": 9857.4246
    },
    {
        "date": "06/01/2020",
        "navValue": 9499.5198,
        "performanceValue": 9586.5309
    },
    {
        "date": "07/01/2020",
        "navValue": 9625.2678,
        "performanceValue": 9758.5748
    },
    {
        "date": "08/01/2020",
        "navValue": 9506.5196,
        "performanceValue": 9666.8004
    },
    {
        "date": "09/01/2020",
        "navValue": 9792.5508,
        "performanceValue": 9944.429
    },
    {
        "date": "10/01/2020",
        "navValue": 9990.1895,
        "performanceValue": 10131.0347
    },
    {
        "date": "10/01/2020",
        "navValue": 9990.1895,
        "performanceValue": 10131.0347
    },
    {
        "date": "13/01/2020",
        "navValue": 9977.1938,
        "performanceValue": 10109.758
    },
    {
        "date": "14/01/2020",
        "navValue": 9967.7358,
        "performanceValue": 10111.5612
    },
    {
        "date": "15/01/2020",
        "navValue": 9898.0604,
        "performanceValue": 10038.602
    },
    {
        "date": "16/01/2020",
        "navValue": 9897.2608,
        "performanceValue": 10032.8102
    },
    {
        "date": "17/01/2020",
        "navValue": 9917.807,
        "performanceValue": 10057.5016
    },
    {
        "date": "20/01/2020",
        "navValue": 9787.7158,
        "performanceValue": 9909.0128
    },
    {
        "date": "21/01/2020",
        "navValue": 9748.4718,
        "performanceValue": 9867.6859
    },
    {
        "date": "22/01/2020",
        "navValue": 9721.3589,
        "performanceValue": 9846.9201
    },
    {
        "date": "23/01/2020",
        "navValue": 9703.3127,
        "performanceValue": 9825.7579
    },
    {
        "date": "24/01/2020",
        "navValue": 9748.5874,
        "performanceValue": 9868.6404
    },
    {
        "date": "27/01/2020",
        "navValue": 9685.1654,
        "performanceValue": 9807.9403
    },
    {
        "date": "28/01/2020",
        "navValue": 9631.5803,
        "performanceValue": 9750.4273
    },
    {
        "date": "29/01/2020",
        "navValue": 9547.8726,
        "performanceValue": 9663.3828
    },
    {
        "date": "30/01/2020",
        "navValue": 9578.0437,
        "performanceValue": 9685.7758
    },
    {
        "date": "31/01/2020",
        "navValue": 9497.6812,
        "performanceValue": 9599.3381
    },
    {
        "date": "03/02/2020",
        "navValue": 9176.7974,
        "performanceValue": 9271.0058
    },
    {
        "date": "04/02/2020",
        "navValue": 9287.3021,
        "performanceValue": 9382.6815
    },
    {
        "date": "05/02/2020",
        "navValue": 9287.1113,
        "performanceValue": 9382.6815
    },
    {
        "date": "06/02/2020",
        "navValue": 9223.348,
        "performanceValue": 9309.3731
    },
    {
        "date": "07/02/2020",
        "navValue": 9066.66,
        "performanceValue": 9146.6187
    },
    {
        "date": "10/02/2020",
        "navValue": 8836.8706,
        "performanceValue": 8908.9116
    },
    {
        "date": "11/02/2020",
        "navValue": 8986.425,
        "performanceValue": 9057.2973
    },
    {
        "date": "12/02/2020",
        "navValue": 9223.1465,
        "performanceValue": 9295.919
    },
    {
        "date": "13/02/2020",
        "navValue": 9176.8688,
        "performanceValue": 9249.6991
    },
    {
        "date": "14/02/2020",
        "navValue": 9107.0647,
        "performanceValue": 9168.0672
    },
    {
        "date": "17/02/2020",
        "navValue": 9062.876,
        "performanceValue": 9118.8175
    },
    {
        "date": "18/02/2020",
        "navValue": 9040.4582,
        "performanceValue": 9099.1466
    },
    {
        "date": "19/02/2020",
        "navValue": 9156.0304,
        "performanceValue": 9218.8223
    },
    {
        "date": "20/02/2020",
        "navValue": 9114.8381,
        "performanceValue": 9172.86
    },
    {
        "date": "21/02/2020",
        "navValue": 9042.327,
        "performanceValue": 9093.6839
    },
    {
        "date": "24/02/2020",
        "navValue": 8764.5585,
        "performanceValue": 8803.7031
    },
    {
        "date": "25/02/2020",
        "navValue": 8710.5044,
        "performanceValue": 8754.5079
    },
    {
        "date": "26/02/2020",
        "navValue": 8563.1388,
        "performanceValue": 8603.964
    },
    {
        "date": "27/02/2020",
        "navValue": 8483.488,
        "performanceValue": 8521.5593
    },
    {
        "date": "28/02/2020",
        "navValue": 8458.6446,
        "performanceValue": 8505.7066
    },
    {
        "date": "02/03/2020",
        "navValue": 8855.3673,
        "performanceValue": 8909.0189
    },
    {
        "date": "03/03/2020",
        "navValue": 8821.2252,
        "performanceValue": 8863.4015
    },
    {
        "date": "04/03/2020",
        "navValue": 8686.1784,
        "performanceValue": 8718.9485
    },
    {
        "date": "05/03/2020",
        "navValue": 8890.9168,
        "performanceValue": 8947.6925
    },
    {
        "date": "06/03/2020",
        "navValue": 8559.7685,
        "performanceValue": 8612.6095
    },
    {
        "date": "09/03/2020",
        "navValue": 8252.1804,
        "performanceValue": 8342.447
    },
    {
        "date": "10/03/2020",
        "navValue": 8301.5547,
        "performanceValue": 8406.6921
    },
    {
        "date": "11/03/2020",
        "navValue": 8266.6054,
        "performanceValue": 8363.3359
    },
    {
        "date": "12/03/2020",
        "navValue": 7828.2459,
        "performanceValue": 7912.6315
    },
    {
        "date": "13/03/2020",
        "navValue": 7925.2316,
        "performanceValue": 8001.193
    },
    {
        "date": "16/03/2020",
        "navValue": 7372.8016,
        "performanceValue": 7444.3571
    },
    {
        "date": "17/03/2020",
        "navValue": 7175.3507,
        "performanceValue": 7263.5347
    },
    {
        "date": "18/03/2020",
        "navValue": 6635.318,
        "performanceValue": 6716.4177
    },
    {
        "date": "19/03/2020",
        "navValue": 6552.5711,
        "performanceValue": 6632.8823
    },
    {
        "date": "20/03/2020",
        "navValue": 6736.9183,
        "performanceValue": 6792.2277
    },
    {
        "date": "23/03/2020",
        "navValue": 6736.7799,
        "performanceValue": 6792.2277
    },
    {
        "date": "24/03/2020",
        "navValue": 6236.0516,
        "performanceValue": 6283.2261
    },
    {
        "date": "25/03/2020",
        "navValue": 5891.5754,
        "performanceValue": 5920.7154
    },
    {
        "date": "26/03/2020",
        "navValue": 5888.7328,
        "performanceValue": 5919.8224
    },
    {
        "date": "27/03/2020",
        "navValue": 6111.8763,
        "performanceValue": 6161.7843
    },
    {
        "date": "30/03/2020",
        "navValue": 6091.7747,
        "performanceValue": 6145.7399
    },
    {
        "date": "31/03/2020",
        "navValue": 6363.8067,
        "performanceValue": 6447.4989
    },
    {
        "date": "01/04/2020",
        "navValue": 6415.471,
        "performanceValue": 6492.4165
    },
    {
        "date": "02/04/2020",
        "navValue": 6780.3906,
        "performanceValue": 6842.5965
    },
    {
        "date": "03/04/2020",
        "navValue": 7069.6396,
        "performanceValue": 7115.9633
    },
    {
        "date": "06/04/2020",
        "navValue": 6842.538,
        "performanceValue": 6872.6174
    },
    {
        "date": "07/04/2020",
        "navValue": 7040.0241,
        "performanceValue": 7070.2814
    },
    {
        "date": "08/04/2020",
        "navValue": 6979.4528,
        "performanceValue": 7002.6088
    },
    {
        "date": "09/04/2020",
        "navValue": 7214.0671,
        "performanceValue": 7230.7002
    },
    {
        "date": "10/04/2020",
        "navValue": 7227.6477,
        "performanceValue": 7239.9625
    },
    {
        "date": "13/04/2020",
        "navValue": 7227.6477,
        "performanceValue": 6990.427
    },
    {
        "date": "14/04/2020",
        "navValue": 7274.5753,
        "performanceValue": 7029.9478
    },
    {
        "date": "15/04/2020",
        "navValue": 7277.0903,
        "performanceValue": 7039.3274
    },
    {
        "date": "16/04/2020",
        "navValue": 7316.643,
        "performanceValue": 7073.2654
    },
    {
        "date": "17/04/2020",
        "navValue": 7769.314,
        "performanceValue": 7525.2062
    },
    {
        "date": "20/04/2020",
        "navValue": 7963.9854,
        "performanceValue": 7745.5208
    },
    {
        "date": "21/04/2020",
        "navValue": 7563.9812,
        "performanceValue": 7381.3099
    },
    {
        "date": "22/04/2020",
        "navValue": 7514.6631,
        "performanceValue": 7334.7494
    },
    {
        "date": "23/04/2020",
        "navValue": 7742.2796,
        "performanceValue": 7523.5275
    },
    {
        "date": "24/04/2020",
        "navValue": 7733.738,
        "performanceValue": 7496.9513
    },
    {
        "date": "27/04/2020",
        "navValue": 7564.6491,
        "performanceValue": 7345.8321
    },
    {
        "date": "28/04/2020",
        "navValue": 7640.5871,
        "performanceValue": 7426.2604
    },
    {
        "date": "29/04/2020",
        "navValue": 7885.2656,
        "performanceValue": 7651.6083
    },
    {
        "date": "30/04/2020",
        "navValue": 8215.4689,
        "performanceValue": 7947.0017
    },
    {
        "date": "01/05/2020",
        "navValue": 8215.3,
        "performanceValue": 7947.0017
    },
    {
        "date": "04/05/2020",
        "navValue": 8148.925,
        "performanceValue": 7876.1948
    },
    {
        "date": "05/05/2020",
        "navValue": 8225.6346,
        "performanceValue": 7951.6199
    },
    {
        "date": "06/05/2020",
        "navValue": 8152.8784,
        "performanceValue": 7881.0249
    },
    {
        "date": "07/05/2020",
        "navValue": 8008.9944,
        "performanceValue": 7736.9125
    },
    {
        "date": "08/05/2020",
        "navValue": 8018.0084,
        "performanceValue": 7742.2378
    },
    {
        "date": "11/05/2020",
        "navValue": 8009.3528,
        "performanceValue": 7742.2378
    },
    {
        "date": "12/05/2020",
        "navValue": 8085.3618,
        "performanceValue": 7822.6217
    },
    {
        "date": "13/05/2020",
        "navValue": 8086.046,
        "performanceValue": 7813.0031
    },
    {
        "date": "14/05/2020",
        "navValue": 8101.4387,
        "performanceValue": 7837.5857
    },
    {
        "date": "15/05/2020",
        "navValue": 8197.871,
        "performanceValue": 7923.0588
    },
    {
        "date": "18/05/2020",
        "navValue": 8185.6819,
        "performanceValue": 7902.7782
    },
    {
        "date": "19/05/2020",
        "navValue": 8307.4767,
        "performanceValue": 7992.2312
    },
    {
        "date": "20/05/2020",
        "navValue": 8220.2953,
        "performanceValue": 7913.6018
    },
    {
        "date": "21/05/2020",
        "navValue": 8194.9276,
        "performanceValue": 7885.6518
    },
    {
        "date": "22/05/2020",
        "navValue": 8194.7592,
        "performanceValue": 7885.6518
    },
    {
        "date": "25/05/2020",
        "navValue": 8194.5908,
        "performanceValue": 7885.6518
    },
    {
        "date": "26/05/2020",
        "navValue": 8194.4225,
        "performanceValue": 7885.6518
    },
    {
        "date": "27/05/2020",
        "navValue": 8194.2541,
        "performanceValue": 7885.6518
    },
    {
        "date": "28/05/2020",
        "navValue": 8139.9489,
        "performanceValue": 7840.498
    },
    {
        "date": "29/05/2020",
        "navValue": 8220.1084,
        "performanceValue": 7895.8085
    },
    {
        "date": "01/06/2020",
        "navValue": 8234.3047,
        "performanceValue": 7904.1664
    },
    {
        "date": "02/06/2020",
        "navValue": 8254.4477,
        "performanceValue": 7914.9772
    },
    {
        "date": "03/06/2020",
        "navValue": 8259.9812,
        "performanceValue": 7905.0279
    },
    {
        "date": "04/06/2020",
        "navValue": 8170.6557,
        "performanceValue": 7820.6239
    },
    {
        "date": "05/06/2020",
        "navValue": 8254.1455,
        "performanceValue": 7884.7215
    },
    {
        "date": "08/06/2020",
        "navValue": 8358.8141,
        "performanceValue": 7985.346
    },
    {
        "date": "09/06/2020",
        "navValue": 8353.9185,
        "performanceValue": 7984.463
    },
    {
        "date": "10/06/2020",
        "navValue": 8357.7077,
        "performanceValue": 7973.5234
    },
    {
        "date": "11/06/2020",
        "navValue": 8395.3199,
        "performanceValue": 8017.3748
    },
    {
        "date": "12/06/2020",
        "navValue": 8253.6283,
        "performanceValue": 7890.1513
    },
    {
        "date": "15/06/2020",
        "navValue": 8032.711,
        "performanceValue": 7674.9058
    },
    {
        "date": "16/06/2020",
        "navValue": 8103.7863,
        "performanceValue": 7742.1591
    },
    {
        "date": "17/06/2020",
        "navValue": 8084.1294,
        "performanceValue": 7711.2723
    },
    {
        "date": "18/06/2020",
        "navValue": 8008.5569,
        "performanceValue": 7632.6672
    },
    {
        "date": "19/06/2020",
        "navValue": 7964.0427,
        "performanceValue": 7585.3067
    },
    {
        "date": "22/06/2020",
        "navValue": 8075.445,
        "performanceValue": 7706.1188
    },
    {
        "date": "23/06/2020",
        "navValue": 8178.6183,
        "performanceValue": 7805.2335
    },
    {
        "date": "24/06/2020",
        "navValue": 8184.4236,
        "performanceValue": 7813.8689
    },
    {
        "date": "25/06/2020",
        "navValue": 8097.5638,
        "performanceValue": 7737.3533
    },
    {
        "date": "26/06/2020",
        "navValue": 8165.5912,
        "performanceValue": 7811.7981
    },
    {
        "date": "29/06/2020",
        "navValue": 8230.1748,
        "performanceValue": 7866.6205
    },
    {
        "date": "30/06/2020",
        "navValue": 8249.8188,
        "performanceValue": 7870.5605
    },
    {
        "date": "01/07/2020",
        "navValue": 8464.949,
        "performanceValue": 8094.7334
    },
    {
        "date": "02/07/2020",
        "navValue": 8452.4339,
        "performanceValue": 8083.4303
    },
    {
        "date": "03/07/2020",
        "navValue": 8445.4057,
        "performanceValue": 8080.0886
    },
    {
        "date": "06/07/2020",
        "navValue": 8465.6193,
        "performanceValue": 8100.9975
    },
    {
        "date": "07/07/2020",
        "navValue": 8471.8292,
        "performanceValue": 8110.4787
    },
    {
        "date": "08/07/2020",
        "navValue": 8511.5523,
        "performanceValue": 8140.3723
    },
    {
        "date": "09/07/2020",
        "navValue": 8630.7665,
        "performanceValue": 8243.029
    },
    {
        "date": "10/07/2020",
        "navValue": 8630.6238,
        "performanceValue": 8251.1163
    },
    {
        "date": "13/07/2020",
        "navValue": 8760.9426,
        "performanceValue": 8433.201
    },
    {
        "date": "14/07/2020",
        "navValue": 8804.4637,
        "performanceValue": 8473.1812
    },
    {
        "date": "15/07/2020",
        "navValue": 8767.4236,
        "performanceValue": 8452.6816
    },
    {
        "date": "16/07/2020",
        "navValue": 8868.9007,
        "performanceValue": 8570.7931
    },
    {
        "date": "17/07/2020",
        "navValue": 8959.4465,
        "performanceValue": 8624.7011
    },
    {
        "date": "17/07/2020",
        "navValue": 8959.4465,
        "performanceValue": 8624.7011
    },
    {
        "date": "20/07/2020",
        "navValue": 9025.6018,
        "performanceValue": 8700.6586
    },
    {
        "date": "21/07/2020",
        "navValue": 9016.5207,
        "performanceValue": 8669.7117
    },
    {
        "date": "22/07/2020",
        "navValue": 9081.297,
        "performanceValue": 8750.9573
    },
    {
        "date": "23/07/2020",
        "navValue": 8995.2173,
        "performanceValue": 8656.7714
    },
    {
        "date": "24/07/2020",
        "navValue": 8916.425,
        "performanceValue": 8579.3098
    },
    {
        "date": "27/07/2020",
        "navValue": 9047.3251,
        "performanceValue": 8717.2583
    },
    {
        "date": "28/07/2020",
        "navValue": 9138.9802,
        "performanceValue": 8820.5648
    },
    {
        "date": "29/07/2020",
        "navValue": 9230.7233,
        "performanceValue": 8919.7939
    },
    {
        "date": "30/07/2020",
        "navValue": 9330.9978,
        "performanceValue": 9031.5541
    },
    {
        "date": "31/07/2020",
        "navValue": 9330.8061,
        "performanceValue": 9031.5541
    },
    {
        "date": "03/08/2020",
        "navValue": 9446.3564,
        "performanceValue": 9153.9633
    },
    {
        "date": "04/08/2020",
        "navValue": 9296.5534,
        "performanceValue": 8992.9564
    },
    {
        "date": "05/08/2020",
        "navValue": 9420.7092,
        "performanceValue": 9135.3643
    },
    {
        "date": "06/08/2020",
        "navValue": 9466.4209,
        "performanceValue": 9203.6437
    },
    {
        "date": "07/08/2020",
        "navValue": 9425.4341,
        "performanceValue": 9167.9097
    },
    {
        "date": "10/08/2020",
        "navValue": 9404.4613,
        "performanceValue": 9144.399
    },
    {
        "date": "11/08/2020",
        "navValue": 9579.6734,
        "performanceValue": 9312.6976
    },
    {
        "date": "12/08/2020",
        "navValue": 9507.8797,
        "performanceValue": 9231.3619
    },
    {
        "date": "13/08/2020",
        "navValue": 9485.9068,
        "performanceValue": 9228.4324
    },
    {
        "date": "14/08/2020",
        "navValue": 9485.7119,
        "performanceValue": 9228.4324
    },
    {
        "date": "17/08/2020",
        "navValue": 9477.1905,
        "performanceValue": 9238.5734
    },
    {
        "date": "18/08/2020",
        "navValue": 9529.6724,
        "performanceValue": 9286.1858
    },
    {
        "date": "19/08/2020",
        "navValue": 9567.171,
        "performanceValue": 9316.4772
    },
    {
        "date": "20/08/2020",
        "navValue": 9471.5006,
        "performanceValue": 9216.7758
    },
    {
        "date": "21/08/2020",
        "navValue": 9388.544,
        "performanceValue": 9119.8723
    },
    {
        "date": "24/08/2020",
        "navValue": 9426.6107,
        "performanceValue": 9159.6349
    },
    {
        "date": "25/08/2020",
        "navValue": 9533.3066,
        "performanceValue": 9263.6626
    },
    {
        "date": "26/08/2020",
        "navValue": 9657.9642,
        "performanceValue": 9370.836
    },
    {
        "date": "27/08/2020",
        "navValue": 9687.3912,
        "performanceValue": 9386.5871
    },
    {
        "date": "28/08/2020",
        "navValue": 9658.3034,
        "performanceValue": 9348.5103
    },
    {
        "date": "31/08/2020",
        "navValue": 9712.2032,
        "performanceValue": 9395.6276
    },
    {
        "date": "01/09/2020",
        "navValue": 9762.318,
        "performanceValue": 9454.151
    },
    {
        "date": "02/09/2020",
        "navValue": 9879.8103,
        "performanceValue": 9564.5086
    },
    {
        "date": "03/09/2020",
        "navValue": 9964.6055,
        "performanceValue": 9664.9671
    },
    {
        "date": "04/09/2020",
        "navValue": 9949.015,
        "performanceValue": 9663.3471
    },
    {
        "date": "07/09/2020",
        "navValue": 10002.1262,
        "performanceValue": 9736.9489
    },
    {
        "date": "08/09/2020",
        "navValue": 9959.8385,
        "performanceValue": 9692.9501
    },
    {
        "date": "09/09/2020",
        "navValue": 9909.577,
        "performanceValue": 9648.1756
    },
    {
        "date": "10/09/2020",
        "navValue": 10071.7135,
        "performanceValue": 9788.8905
    },
    {
        "date": "11/09/2020",
        "navValue": 10013.0316,
        "performanceValue": 9729.8376
    },
    {
        "date": "14/09/2020",
        "navValue": 9996.2825,
        "performanceValue": 9706.6775
    },
    {
        "date": "15/09/2020",
        "navValue": 9967.0464,
        "performanceValue": 9674.5757
    },
    {
        "date": "16/09/2020",
        "navValue": 9982.5132,
        "performanceValue": 9683.476
    },
    {
        "date": "17/09/2020",
        "navValue": 10014.8469,
        "performanceValue": 9717.2651
    },
    {
        "date": "18/09/2020",
        "navValue": 10076.6972,
        "performanceValue": 9779.3648
    },
    {
        "date": "21/09/2020",
        "navValue": 10011.4334,
        "performanceValue": 9711.5319
    },
    {
        "date": "22/09/2020",
        "navValue": 9911.1454,
        "performanceValue": 9615.2838
    },
    {
        "date": "23/09/2020",
        "navValue": 9894.4067,
        "performanceValue": 9594.3807
    },
    {
        "date": "24/09/2020",
        "navValue": 9888.1763,
        "performanceValue": 9578.8443
    },
    {
        "date": "25/09/2020",
        "navValue": 9834.8213,
        "performanceValue": 9525.4329
    },
    {
        "date": "28/09/2020",
        "navValue": 9635.22,
        "performanceValue": 9324.8708
    },
    {
        "date": "29/09/2020",
        "navValue": 9745.0265,
        "performanceValue": 9428.8886
    },
    {
        "date": "30/09/2020",
        "navValue": 9605.9268,
        "performanceValue": 9264.8891
    },
    {
        "date": "01/10/2020",
        "navValue": 9640.8873,
        "performanceValue": 9287.2664
    },
    {
        "date": "02/10/2020",
        "navValue": 9434.9065,
        "performanceValue": 9072.652
    },
    {
        "date": "05/10/2020",
        "navValue": 9206.4568,
        "performanceValue": 8842.6157
    },
    {
        "date": "06/10/2020",
        "navValue": 9211.8926,
        "performanceValue": 8868.2258
    },
    {
        "date": "07/10/2020",
        "navValue": 9405.8121,
        "performanceValue": 9072.3915
    },
    {
        "date": "08/10/2020",
        "navValue": 9594.1296,
        "performanceValue": 9261.9668
    },
    {
        "date": "09/10/2020",
        "navValue": 9671.1775,
        "performanceValue": 9341.1085
    },
    {
        "date": "12/10/2020",
        "navValue": 9527.2469,
        "performanceValue": 9183.7982
    },
    {
        "date": "13/10/2020",
        "navValue": 9451.2583,
        "performanceValue": 9127.0837
    },
    {
        "date": "14/10/2020",
        "navValue": 9471.615,
        "performanceValue": 9149.0488
    },
    {
        "date": "15/10/2020",
        "navValue": 9443.8086,
        "performanceValue": 9126.039
    },
    {
        "date": "16/10/2020",
        "navValue": 9437.4567,
        "performanceValue": 9125.385
    },
    {
        "date": "19/10/2020",
        "navValue": 9516.0845,
        "performanceValue": 9204.3421
    },
    {
        "date": "20/10/2020",
        "navValue": 9516.0845,
        "performanceValue": 9406.5171
    },
    {
        "date": "21/10/2020",
        "navValue": 9611.8883,
        "performanceValue": 9507.0571
    },
    {
        "date": "22/10/2020",
        "navValue": 9502.0542,
        "performanceValue": 9393.3378
    },
    {
        "date": "23/10/2020",
        "navValue": 9565.4922,
        "performanceValue": 9436.1459
    },
    {
        "date": "26/10/2020",
        "navValue": 9732.9412,
        "performanceValue": 9645.0772
    },
    {
        "date": "27/10/2020",
        "navValue": 9604.9288,
        "performanceValue": 9501.8993
    },
    {
        "date": "28/10/2020",
        "navValue": 9498.6229,
        "performanceValue": 9402.321
    },
    {
        "date": "29/10/2020",
        "navValue": 9178.6198,
        "performanceValue": 9087.2309
    },
    {
        "date": "30/10/2020",
        "navValue": 9178.4312,
        "performanceValue": 9087.2309
    },
    {
        "date": "02/11/2020",
        "navValue": 8983.6239,
        "performanceValue": 8890.3741
    },
    {
        "date": "03/11/2020",
        "navValue": 9344.3008,
        "performanceValue": 9253.1281
    },
    {
        "date": "04/11/2020",
        "navValue": 9307.2918,
        "performanceValue": 9207.359
    },
    {
        "date": "05/11/2020",
        "navValue": 9503.608,
        "performanceValue": 9410.2595
    },
    {
        "date": "06/11/2020",
        "navValue": 9411.179,
        "performanceValue": 9327.4984
    },
    {
        "date": "09/11/2020",
        "navValue": 9399.8538,
        "performanceValue": 9300.0149
    },
    {
        "date": "10/11/2020",
        "navValue": 9560.8806,
        "performanceValue": 9436.319
    },
    {
        "date": "11/11/2020",
        "navValue": 9594.4188,
        "performanceValue": 9460.4422
    },
    {
        "date": "12/11/2020",
        "navValue": 9443.4959,
        "performanceValue": 9299.172
    },
    {
        "date": "13/11/2020",
        "navValue": 9392.957,
        "performanceValue": 9266.1557
    },
    {
        "date": "16/11/2020",
        "navValue": 9356.5995,
        "performanceValue": 9234.7723
    },
    {
        "date": "17/11/2020",
        "navValue": 9411.4159,
        "performanceValue": 9283.398
    },
    {
        "date": "18/11/2020",
        "navValue": 9351.5351,
        "performanceValue": 9230.094
    },
    {
        "date": "19/11/2020",
        "navValue": 9353.3074,
        "performanceValue": 9233.3255
    },
    {
        "date": "20/11/2020",
        "navValue": 9289.9385,
        "performanceValue": 9160.6596
    },
    {
        "date": "23/11/2020",
        "navValue": 9164.6055,
        "performanceValue": 9023.232
    },
    {
        "date": "24/11/2020",
        "navValue": 9232.7621,
        "performanceValue": 9091.48
    },
    {
        "date": "25/11/2020",
        "navValue": 9435.0485,
        "performanceValue": 9302.9144
    },
    {
        "date": "26/11/2020",
        "navValue": 9623.8657,
        "performanceValue": 9497.1923
    },
    {
        "date": "27/11/2020",
        "navValue": 9518.545,
        "performanceValue": 9407.0924
    },
    {
        "date": "30/11/2020",
        "navValue": 9582.411,
        "performanceValue": 9491.0127
    },
    {
        "date": "01/12/2020",
        "navValue": 9714.533,
        "performanceValue": 9609.7038
    },
    {
        "date": "02/12/2020",
        "navValue": 9797.6579,
        "performanceValue": 9710.1824
    },
    {
        "date": "03/12/2020",
        "navValue": 9798.3462,
        "performanceValue": 9734.9167
    },
    {
        "date": "04/12/2020",
        "navValue": 9829.5306,
        "performanceValue": 9774.1641
    },
    {
        "date": "07/12/2020",
        "navValue": 9778.7857,
        "performanceValue": 9733.7689
    },
    {
        "date": "08/12/2020",
        "navValue": 9787.7624,
        "performanceValue": 9725.5027
    },
    {
        "date": "09/12/2020",
        "navValue": 9824.9941,
        "performanceValue": 9774.6321
    },
    {
        "date": "10/12/2020",
        "navValue": 9798.898,
        "performanceValue": 9774.3029
    },
    {
        "date": "11/12/2020",
        "navValue": 9895.2991,
        "performanceValue": 9877.4949
    },
    {
        "date": "14/12/2020",
        "navValue": 10110.766,
        "performanceValue": 10109.7666
    },
    {
        "date": "15/12/2020",
        "navValue": 10065.6759,
        "performanceValue": 10064.3767
    },
    {
        "date": "16/12/2020",
        "navValue": 10126.9111,
        "performanceValue": 10120.2869
    },
    {
        "date": "17/12/2020",
        "navValue": 10242.5995,
        "performanceValue": 10268.0486
    },
    {
        "date": "18/12/2020",
        "navValue": 10218.1254,
        "performanceValue": 10253.5928
    },
    {
        "date": "21/12/2020",
        "navValue": 10060.7806,
        "performanceValue": 10086.9214
    },
    {
        "date": "22/12/2020",
        "navValue": 9953.2162,
        "performanceValue": 9974.3999
    },
    {
        "date": "23/12/2020",
        "navValue": 10001.5573,
        "performanceValue": 10035.5794
    },
    {
        "date": "24/12/2020",
        "navValue": 10074.3072,
        "performanceValue": 10125.1713
    },
    {
        "date": "25/12/2020",
        "navValue": 10074.1002,
        "performanceValue": 10125.1713
    },
    {
        "date": "28/12/2020",
        "navValue": 10138.5092,
        "performanceValue": 10205.2991
    },
    {
        "date": "29/12/2020",
        "navValue": 10037.8486,
        "performanceValue": 10104.8335
    },
    {
        "date": "30/12/2020",
        "navValue": 10104.0768,
        "performanceValue": 10182.4553
    },
    {
        "date": "30/12/2020",
        "navValue": 10104.0768,
        "performanceValue": 10182.4553
    },
    {
        "date": "31/12/2020",
        "navValue": 10113.3729,
        "performanceValue": 10185.0414
    },
    {
        "date": "01/01/2021",
        "navValue": 10296.2426,
        "performanceValue": 10369.2628
    },
    {
        "date": "04/01/2021",
        "navValue": 10351.0045,
        "performanceValue": 10433.8384
    },
    {
        "date": "05/01/2021",
        "navValue": 10333.0689,
        "performanceValue": 10395.2293
    },
    {
        "date": "06/01/2021",
        "navValue": 10483.9013,
        "performanceValue": 10566.1225
    },
    {
        "date": "07/01/2021",
        "navValue": 10470.5765,
        "performanceValue": 10544.5939
    },
    {
        "date": "08/01/2021",
        "navValue": 10519.0805,
        "performanceValue": 10588.9834
    },
    {
        "date": "11/01/2021",
        "navValue": 10492.6878,
        "performanceValue": 10564.5912
    },
    {
        "date": "12/01/2021",
        "navValue": 10579.2138,
        "performanceValue": 10652.8679
    },
    {
        "date": "13/01/2021",
        "navValue": 10607.6221,
        "performanceValue": 10671.454
    },
    {
        "date": "14/01/2021",
        "navValue": 10530.9608,
        "performanceValue": 10592.5312
    },
    {
        "date": "15/01/2021",
        "navValue": 10494.4223,
        "performanceValue": 10553.4698
    },
    {
        "date": "18/01/2021",
        "navValue": 10387.8433,
        "performanceValue": 10440.5247
    },
    {
        "date": "19/01/2021",
        "navValue": 10424.5032,
        "performanceValue": 10481.1961
    },
    {
        "date": "20/01/2021",
        "navValue": 10351.1959,
        "performanceValue": 10409.4777
    },
    {
        "date": "21/01/2021",
        "navValue": 10443.9603,
        "performanceValue": 10486.1178
    },
    {
        "date": "22/01/2021",
        "navValue": 10392.8242,
        "performanceValue": 10425.8427
    },
    {
        "date": "25/01/2021",
        "navValue": 10432.2275,
        "performanceValue": 10453.9244
    },
    {
        "date": "26/01/2021",
        "navValue": 10505.3528,
        "performanceValue": 10534.347
    },
    {
        "date": "27/01/2021",
        "navValue": 10564.1084,
        "performanceValue": 10591.6282
    },
    {
        "date": "28/01/2021",
        "navValue": 10514.0616,
        "performanceValue": 10535.7137
    },
    {
        "date": "29/01/2021",
        "navValue": 10592.7391,
        "performanceValue": 10622.2759
    },
    {
        "date": "01/02/2021",
        "navValue": 10589.2028,
        "performanceValue": 10624.5142
    },
    {
        "date": "02/02/2021",
        "navValue": 10688.1071,
        "performanceValue": 10719.9237
    },
    {
        "date": "03/02/2021",
        "navValue": 10845.6389,
        "performanceValue": 10879.5667
    },
    {
        "date": "04/02/2021",
        "navValue": 10883.9934,
        "performanceValue": 10923.4081
    },
    {
        "date": "05/02/2021",
        "navValue": 10883.7697,
        "performanceValue": 10923.4081
    },
    {
        "date": "08/02/2021",
        "navValue": 10831.3401,
        "performanceValue": 10874.4347
    },
    {
        "date": "09/02/2021",
        "navValue": 10840.0541,
        "performanceValue": 10894.6752
    },
    {
        "date": "10/02/2021",
        "navValue": 10868.881,
        "performanceValue": 10917.3845
    },
    {
        "date": "11/02/2021",
        "navValue": 10770.8863,
        "performanceValue": 10824.8859
    },
    {
        "date": "12/02/2021",
        "navValue": 10751.1997,
        "performanceValue": 10800.883
    },
    {
        "date": "15/02/2021",
        "navValue": 10928.7744,
        "performanceValue": 10975.8892
    },
    {
        "date": "16/02/2021",
        "navValue": 11075.2683,
        "performanceValue": 11127.3763
    },
    {
        "date": "17/02/2021",
        "navValue": 11101.2985,
        "performanceValue": 11154.8641
    },
    {
        "date": "18/02/2021",
        "navValue": 10928.008,
        "performanceValue": 10975.7833
    },
    {
        "date": "19/02/2021",
        "navValue": 10916.1965,
        "performanceValue": 10965.7826
    },
    {
        "date": "22/02/2021",
        "navValue": 10811.4109,
        "performanceValue": 10862.3573
    },
    {
        "date": "23/02/2021",
        "navValue": 10814.5011,
        "performanceValue": 10867.7098
    },
    {
        "date": "24/02/2021",
        "navValue": 10719.6997,
        "performanceValue": 10772.9544
    },
    {
        "date": "25/02/2021",
        "navValue": 10873.9598,
        "performanceValue": 10932.6847
    },
    {
        "date": "26/02/2021",
        "navValue": 10853.1786,
        "performanceValue": 10916.4614
    },
    {
        "date": "01/03/2021",
        "navValue": 10811.5757,
        "performanceValue": 10876.9936
    },
    {
        "date": "02/03/2021",
        "navValue": 10867.5794,
        "performanceValue": 10934.7284
    },
    {
        "date": "03/03/2021",
        "navValue": 10945.363,
        "performanceValue": 11023.2841
    },
    {
        "date": "04/03/2021",
        "navValue": 10710.8663,
        "performanceValue": 10782.0507
    },
    {
        "date": "05/03/2021",
        "navValue": 10861.9188,
        "performanceValue": 10935.713
    },
    {
        "date": "08/03/2021",
        "navValue": 10642.5538,
        "performanceValue": 10720.529
    },
    {
        "date": "09/03/2021",
        "navValue": 10387.7747,
        "performanceValue": 10457.8801
    },
    {
        "date": "10/03/2021",
        "navValue": 10280.437,
        "performanceValue": 10337.7005
    },
    {
        "date": "11/03/2021",
        "navValue": 10053.2115,
        "performanceValue": 10107.992
    },
    {
        "date": "12/03/2021",
        "navValue": 10327.345,
        "performanceValue": 10379.2507
    },
    {
        "date": "15/03/2021",
        "navValue": 10562.0275,
        "performanceValue": 10627.9203
    },
    {
        "date": "16/03/2021",
        "navValue": 10534.3366,
        "performanceValue": 10599.2876
    },
    {
        "date": "17/03/2021",
        "navValue": 10646.2966,
        "performanceValue": 10720.6679
    },
    {
        "date": "18/03/2021",
        "navValue": 10466.3225,
        "performanceValue": 10533.132
    },
    {
        "date": "19/03/2021",
        "navValue": 10493.6488,
        "performanceValue": 10564.1418
    },
    {
        "date": "22/03/2021",
        "navValue": 10677.097,
        "performanceValue": 10749.4952
    },
    {
        "date": "23/03/2021",
        "navValue": 10676.8776,
        "performanceValue": 10749.4952
    },
    {
        "date": "24/03/2021",
        "navValue": 10638.3888,
        "performanceValue": 10721.3405
    },
    {
        "date": "25/03/2021",
        "navValue": 10620.6388,
        "performanceValue": 10714.3952
    },
    {
        "date": "26/03/2021",
        "navValue": 10543.6631,
        "performanceValue": 10647.846
    },
    {
        "date": "29/03/2021",
        "navValue": 10295.0979,
        "performanceValue": 10389.0425
    },
    {
        "date": "30/03/2021",
        "navValue": 10299.4422,
        "performanceValue": 10394.8443
    },
    {
        "date": "31/03/2021",
        "navValue": 10299.4422,
        "performanceValue": 10453.0013
    },
    {
        "date": "01/04/2021",
        "navValue": 10332.4118,
        "performanceValue": 10464.7352
    },
    {
        "date": "02/04/2021",
        "navValue": 10322.2004,
        "performanceValue": 10462.3609
    },
    {
        "date": "05/04/2021",
        "navValue": 10198.9236,
        "performanceValue": 10329.6118
    },
    {
        "date": "06/04/2021",
        "navValue": 10376.5446,
        "performanceValue": 10518.0807
    },
    {
        "date": "07/04/2021",
        "navValue": 10264.9183,
        "performanceValue": 10406.8716
    },
    {
        "date": "08/04/2021",
        "navValue": 10445.9755,
        "performanceValue": 10584.2321
    },
    {
        "date": "09/04/2021",
        "navValue": 10526.872,
        "performanceValue": 10658.1244
    },
    {
        "date": "12/04/2021",
        "navValue": 10420.867,
        "performanceValue": 10571.2832
    },
    {
        "date": "13/04/2021",
        "navValue": 10437.7805,
        "performanceValue": 10572.3436
    },
    {
        "date": "14/04/2021",
        "navValue": 10487.4923,
        "performanceValue": 10639.4653
    },
    {
        "date": "15/04/2021",
        "navValue": 10469.7584,
        "performanceValue": 10623.4394
    },
    {
        "date": "16/04/2021",
        "navValue": 10475.226,
        "performanceValue": 10630.4234
    },
    {
        "date": "19/04/2021",
        "navValue": 10442.2938,
        "performanceValue": 10599.9259
    },
    {
        "date": "20/04/2021",
        "navValue": 10504.3046,
        "performanceValue": 10658.9645
    },
    {
        "date": "21/04/2021",
        "navValue": 10446.8426,
        "performanceValue": 10577.7734
    },
    {
        "date": "22/04/2021",
        "navValue": 10310.9736,
        "performanceValue": 10444.383
    },
    {
        "date": "23/04/2021",
        "navValue": 10235.9676,
        "performanceValue": 10377.7265
    },
    {
        "date": "26/04/2021",
        "navValue": 10551.9396,
        "performanceValue": 10680.3914
    },
    {
        "date": "27/04/2021",
        "navValue": 10369.7622,
        "performanceValue": 10503.4631
    },
    {
        "date": "28/04/2021",
        "navValue": 10304.6209,
        "performanceValue": 10440.8882
    },
    {
        "date": "29/04/2021",
        "navValue": 10245.0564,
        "performanceValue": 10373.6692
    },
    {
        "date": "30/04/2021",
        "navValue": 10108.5005,
        "performanceValue": 10229.3193
    },
    {
        "date": "03/05/2021",
        "navValue": 10094.8184,
        "performanceValue": 10210.673
    },
    {
        "date": "04/05/2021",
        "navValue": 10185.8933,
        "performanceValue": 10312.9963
    },
    {
        "date": "05/05/2021",
        "navValue": 10301.0436,
        "performanceValue": 10425.15
    },
    {
        "date": "06/05/2021",
        "navValue": 10334.5388,
        "performanceValue": 10466.7631
    },
    {
        "date": "07/05/2021",
        "navValue": 10334.3265,
        "performanceValue": 10466.7631
    },
    {
        "date": "10/05/2021",
        "navValue": 10334.1141,
        "performanceValue": 10466.7631
    },
    {
        "date": "11/05/2021",
        "navValue": 10333.9018,
        "performanceValue": 10466.7631
    },
    {
        "date": "12/05/2021",
        "navValue": 10333.6894,
        "performanceValue": 10466.7631
    },
    {
        "date": "13/05/2021",
        "navValue": 10333.4771,
        "performanceValue": 10466.7631
    },
    {
        "date": "14/05/2021",
        "navValue": 10333.2648,
        "performanceValue": 10466.7631
    },
    {
        "date": "17/05/2021",
        "navValue": 10482.0984,
        "performanceValue": 10635.7429
    },
    {
        "date": "18/05/2021",
        "navValue": 10582.1757,
        "performanceValue": 10733.5939
    },
    {
        "date": "19/05/2021",
        "navValue": 10527.7591,
        "performanceValue": 10678.7743
    },
    {
        "date": "20/05/2021",
        "navValue": 10493.0745,
        "performanceValue": 10645.4145
    },
    {
        "date": "21/05/2021",
        "navValue": 10590.0215,
        "performanceValue": 10748.6308
    },
    {
        "date": "24/05/2021",
        "navValue": 10645.182,
        "performanceValue": 10817.4626
    },
    {
        "date": "25/05/2021",
        "navValue": 10700.7098,
        "performanceValue": 10875.3935
    },
    {
        "date": "26/05/2021",
        "navValue": 10816.4825,
        "performanceValue": 10983.9666
    },
    {
        "date": "27/05/2021",
        "navValue": 10804.1258,
        "performanceValue": 10960.6648
    },
    {
        "date": "28/05/2021",
        "navValue": 10892.0374,
        "performanceValue": 11044.4377
    },
    {
        "date": "31/05/2021",
        "navValue": 11119.0276,
        "performanceValue": 11270.1248
    },
    {
        "date": "01/06/2021",
        "navValue": 11207.5763,
        "performanceValue": 11349.9735
    },
    {
        "date": "02/06/2021",
        "navValue": 11161.9107,
        "performanceValue": 11318.0606
    },
    {
        "date": "03/06/2021",
        "navValue": 11155.3111,
        "performanceValue": 11306.7447
    },
    {
        "date": "04/06/2021",
        "navValue": 11181.291,
        "performanceValue": 11341.2035
    },
    {
        "date": "07/06/2021",
        "navValue": 11183.3525,
        "performanceValue": 11332.6697
    },
    {
        "date": "08/06/2021",
        "navValue": 11124.1108,
        "performanceValue": 11276.3159
    },
    {
        "date": "09/06/2021",
        "navValue": 11039.9804,
        "performanceValue": 11195.8747
    },
    {
        "date": "10/06/2021",
        "navValue": 11113.1388,
        "performanceValue": 11275.1767
    },
    {
        "date": "11/06/2021",
        "navValue": 11110.4864,
        "performanceValue": 11277.1645
    },
    {
        "date": "14/06/2021",
        "navValue": 11319.8034,
        "performanceValue": 11473.1241
    },
    {
        "date": "15/06/2021",
        "navValue": 11290.6703,
        "performanceValue": 11434.7997
    },
    {
        "date": "16/06/2021",
        "navValue": 11218.9531,
        "performanceValue": 11356.8773
    },
    {
        "date": "17/06/2021",
        "navValue": 11168.8939,
        "performanceValue": 11298.2967
    },
    {
        "date": "18/06/2021",
        "navValue": 11200.1015,
        "performanceValue": 11335.0253
    },
    {
        "date": "21/06/2021",
        "navValue": 11128.7388,
        "performanceValue": 11260.1784
    },
    {
        "date": "22/06/2021",
        "navValue": 11123.6323,
        "performanceValue": 11242.1848
    },
    {
        "date": "23/06/2021",
        "navValue": 11097.6509,
        "performanceValue": 11213.034
    },
    {
        "date": "24/06/2021",
        "navValue": 11117.5674,
        "performanceValue": 11236.4445
    },
    {
        "date": "25/06/2021",
        "navValue": 10990.986,
        "performanceValue": 11105.0305
    },
    {
        "date": "28/06/2021",
        "navValue": 10841.4236,
        "performanceValue": 10945.3388
    },
    {
        "date": "29/06/2021",
        "navValue": 10839.6565,
        "performanceValue": 10917.7279
    },
    {
        "date": "30/06/2021",
        "navValue": 10891.9716,
        "performanceValue": 10965.5736
    },
    {
        "date": "01/07/2021",
        "navValue": 11031.879,
        "performanceValue": 11094.2899
    },
    {
        "date": "02/07/2021",
        "navValue": 11020.5886,
        "performanceValue": 11063.4947
    },
    {
        "date": "02/07/2021",
        "navValue": 11020.5886,
        "performanceValue": 11063.4947
    },
    {
        "date": "05/07/2021",
        "navValue": 10972.8569,
        "performanceValue": 11008.293
    },
    {
        "date": "06/07/2021",
        "navValue": 10939.9349,
        "performanceValue": 10968.4244
    },
    {
        "date": "07/07/2021",
        "navValue": 10898.6977,
        "performanceValue": 10944.0952
    },
    {
        "date": "08/07/2021",
        "navValue": 11111.9889,
        "performanceValue": 11171.5826
    },
    {
        "date": "09/07/2021",
        "navValue": 10963.4295,
        "performanceValue": 11014.9649
    },
    {
        "date": "12/07/2021",
        "navValue": 10939.4022,
        "performanceValue": 10984.622
    },
    {
        "date": "13/07/2021",
        "navValue": 10934.2387,
        "performanceValue": 10980.3773
    },
    {
        "date": "14/07/2021",
        "navValue": 10945.5463,
        "performanceValue": 11002.5327
    },
    {
        "date": "15/07/2021",
        "navValue": 10994.9761,
        "performanceValue": 11056.8829
    },
    {
        "date": "16/07/2021",
        "navValue": 11042.3199,
        "performanceValue": 11118.8052
    },
    {
        "date": "19/07/2021",
        "navValue": 11041.4045,
        "performanceValue": 11125.9537
    },
    {
        "date": "20/07/2021",
        "navValue": 11041.1777,
        "performanceValue": 11125.9537
    },
    {
        "date": "21/07/2021",
        "navValue": 11040.9508,
        "performanceValue": 11125.9537
    },
    {
        "date": "22/07/2021",
        "navValue": 11040.7239,
        "performanceValue": 11125.9537
    },
    {
        "date": "23/07/2021",
        "navValue": 11021.6171,
        "performanceValue": 11110.4044
    },
    {
        "date": "26/07/2021",
        "navValue": 10971.8135,
        "performanceValue": 11058.8621
    },
    {
        "date": "27/07/2021",
        "navValue": 10960.0401,
        "performanceValue": 11025.4852
    },
    {
        "date": "28/07/2021",
        "navValue": 10891.6991,
        "performanceValue": 10940.6161
    },
    {
        "date": "29/07/2021",
        "navValue": 10909.7236,
        "performanceValue": 10954.5582
    },
    {
        "date": "30/07/2021",
        "navValue": 10870.4924,
        "performanceValue": 10913.7236
    },
    {
        "date": "02/08/2021",
        "navValue": 10975.9358,
        "performanceValue": 11020.6952
    },
    {
        "date": "03/08/2021",
        "navValue": 11040.73,
        "performanceValue": 11085.6201
    },
    {
        "date": "04/08/2021",
        "navValue": 11028.8846,
        "performanceValue": 11082.0737
    },
    {
        "date": "05/08/2021",
        "navValue": 10992.0876,
        "performanceValue": 11049.6986
    },
    {
        "date": "06/08/2021",
        "navValue": 10953.252,
        "performanceValue": 10996.9269
    },
    {
        "date": "09/08/2021",
        "navValue": 10847.0884,
        "performanceValue": 10885.7106
    },
    {
        "date": "10/08/2021",
        "navValue": 10863.0119,
        "performanceValue": 10903.6184
    },
    {
        "date": "11/08/2021",
        "navValue": 10927.0451,
        "performanceValue": 10967.7833
    },
    {
        "date": "12/08/2021",
        "navValue": 10891.231,
        "performanceValue": 10931.8189
    },
    {
        "date": "13/08/2021",
        "navValue": 10839.4234,
        "performanceValue": 10866.5792
    },
    {
        "date": "16/08/2021",
        "navValue": 10793.9736,
        "performanceValue": 10816.8186
    },
    {
        "date": "17/08/2021",
        "navValue": 10898.5746,
        "performanceValue": 10935.5298
    },
    {
        "date": "18/08/2021",
        "navValue": 10898.3506,
        "performanceValue": 10935.5298
    },
    {
        "date": "19/08/2021",
        "navValue": 10898.1267,
        "performanceValue": 10935.5298
    },
    {
        "date": "20/08/2021",
        "navValue": 11022.6216,
        "performanceValue": 11069.7688
    },
    {
        "date": "23/08/2021",
        "navValue": 11182.0371,
        "performanceValue": 11237.482
    },
    {
        "date": "24/08/2021",
        "navValue": 11070.9246,
        "performanceValue": 11132.6414
    },
    {
        "date": "25/08/2021",
        "navValue": 11019.612,
        "performanceValue": 11076.82
    },
    {
        "date": "26/08/2021",
        "navValue": 10937.0987,
        "performanceValue": 10994.9634
    },
    {
        "date": "27/08/2021",
        "navValue": 10913.0699,
        "performanceValue": 10986.6786
    },
    {
        "date": "30/08/2021",
        "navValue": 11019.3345,
        "performanceValue": 11082.0394
    },
    {
        "date": "31/08/2021",
        "navValue": 11040.7121,
        "performanceValue": 11111.5765
    },
    {
        "date": "01/09/2021",
        "navValue": 11047.9093,
        "performanceValue": 11114.7623
    },
    {
        "date": "02/09/2021",
        "navValue": 10929.3049,
        "performanceValue": 11005.0801
    },
    {
        "date": "03/09/2021",
        "navValue": 10956.9343,
        "performanceValue": 11036.306
    },
    {
        "date": "06/09/2021",
        "navValue": 10944.7766,
        "performanceValue": 11025.3693
    },
    {
        "date": "07/09/2021",
        "navValue": 10859.0248,
        "performanceValue": 10943.932
    },
    {
        "date": "08/09/2021",
        "navValue": 10708.8748,
        "performanceValue": 10799.6107
    },
    {
        "date": "09/09/2021",
        "navValue": 10751.9007,
        "performanceValue": 10866.2815
    },
    {
        "date": "10/09/2021",
        "navValue": 10891.4604,
        "performanceValue": 11019.2197
    },
    {
        "date": "13/09/2021",
        "navValue": 10884.9272,
        "performanceValue": 11004.9198
    },
    {
        "date": "14/09/2021",
        "navValue": 10763.2191,
        "performanceValue": 10872.1048
    },
    {
        "date": "15/09/2021",
        "navValue": 10677.634,
        "performanceValue": 10795.3745
    },
    {
        "date": "16/09/2021",
        "navValue": 10704.069,
        "performanceValue": 10819.3131
    },
    {
        "date": "17/09/2021",
        "navValue": 10605.6253,
        "performanceValue": 10707.241
    },
    {
        "date": "20/09/2021",
        "navValue": 10544.183,
        "performanceValue": 10651.5169
    },
    {
        "date": "21/09/2021",
        "navValue": 10387.7016,
        "performanceValue": 10483.317
    },
    {
        "date": "22/09/2021",
        "navValue": 10308.195,
        "performanceValue": 10393.4447
    },
    {
        "date": "23/09/2021",
        "navValue": 10256.6447,
        "performanceValue": 10324.932
    },
    {
        "date": "24/09/2021",
        "navValue": 10231.8278,
        "performanceValue": 10290.486
    },
    {
        "date": "27/09/2021",
        "navValue": 10210.5783,
        "performanceValue": 10278.3657
    },
    {
        "date": "28/09/2021",
        "navValue": 10318.4354,
        "performanceValue": 10391.9677
    },
    {
        "date": "29/09/2021",
        "navValue": 10104.7212,
        "performanceValue": 10177.8657
    },
    {
        "date": "30/09/2021",
        "navValue": 10272.2682,
        "performanceValue": 10349.3857
    },
    {
        "date": "01/10/2021",
        "navValue": 10242.5689,
        "performanceValue": 10333.2697
    },
    {
        "date": "04/10/2021",
        "navValue": 10264.0926,
        "performanceValue": 10371.7057
    },
    {
        "date": "05/10/2021",
        "navValue": 10264.0926,
        "performanceValue": 10284.7128
    },
    {
        "date": "06/10/2021",
        "navValue": 10196.2301,
        "performanceValue": 10221.8988
    },
    {
        "date": "07/10/2021",
        "navValue": 10257.8221,
        "performanceValue": 10254.035
    },
    {
        "date": "08/10/2021",
        "navValue": 10218.7638,
        "performanceValue": 10229.3737
    },
    {
        "date": "11/10/2021",
        "navValue": 10080.0629,
        "performanceValue": 10091.6828
    },
    {
        "date": "12/10/2021",
        "navValue": 10078.3357,
        "performanceValue": 10075.4652
    },
    {
        "date": "13/10/2021",
        "navValue": 9895.4575,
        "performanceValue": 9894.2578
    },
    {
        "date": "14/10/2021",
        "navValue": 10160.3643,
        "performanceValue": 10143.9364
    },
    {
        "date": "15/10/2021",
        "navValue": 10335.828,
        "performanceValue": 10313.4099
    },
    {
        "date": "18/10/2021",
        "navValue": 10305.8776,
        "performanceValue": 10283.263
    },
    {
        "date": "19/10/2021",
        "navValue": 10305.6659,
        "performanceValue": 10283.263
    },
    {
        "date": "20/10/2021",
        "navValue": 10529.7315,
        "performanceValue": 10509.8245
    },
    {
        "date": "21/10/2021",
        "navValue": 10641.4324,
        "performanceValue": 10608.4483
    },
    {
        "date": "22/10/2021",
        "navValue": 10563.1779,
        "performanceValue": 10504.2188
    },
    {
        "date": "25/10/2021",
        "navValue": 10523.2241,
        "performanceValue": 10456.4046
    },
    {
        "date": "26/10/2021",
        "navValue": 10488.0014,
        "performanceValue": 10437.3075
    },
    {
        "date": "27/10/2021",
        "navValue": 10642.023,
        "performanceValue": 10603.0057
    },
    {
        "date": "28/10/2021",
        "navValue": 10686.9632,
        "performanceValue": 10616.5757
    },
    {
        "date": "29/10/2021",
        "navValue": 10762.2905,
        "performanceValue": 10671.0647
    },
    {
        "date": "01/11/2021",
        "navValue": 11018.7514,
        "performanceValue": 10911.3737
    },
    {
        "date": "02/11/2021",
        "navValue": 11032.1794,
        "performanceValue": 10939.9463
    },
    {
        "date": "03/11/2021",
        "navValue": 10957.3657,
        "performanceValue": 10893.0409
    },
    {
        "date": "04/11/2021",
        "navValue": 10995.7713,
        "performanceValue": 10950.9159
    },
    {
        "date": "05/11/2021",
        "navValue": 11012.1864,
        "performanceValue": 10959.2623
    },
    {
        "date": "08/11/2021",
        "navValue": 10968.7509,
        "performanceValue": 10910.3977
    },
    {
        "date": "09/11/2021",
        "navValue": 10778.585,
        "performanceValue": 10714.9834
    },
    {
        "date": "10/11/2021",
        "navValue": 10859.7968,
        "performanceValue": 10800.9101
    },
    {
        "date": "11/11/2021",
        "navValue": 10788.2015,
        "performanceValue": 10733.5524
    },
    {
        "date": "12/11/2021",
        "navValue": 10606.7155,
        "performanceValue": 10565.0177
    },
    {
        "date": "15/11/2021",
        "navValue": 10578.3192,
        "performanceValue": 10557.3811
    },
    {
        "date": "16/11/2021",
        "navValue": 10822.4153,
        "performanceValue": 10790.5487
    },
    {
        "date": "17/11/2021",
        "navValue": 10697.1579,
        "performanceValue": 10684.0308
    },
    {
        "date": "18/11/2021",
        "navValue": 10710.4964,
        "performanceValue": 10698.4695
    },
    {
        "date": "19/11/2021",
        "navValue": 10831.6185,
        "performanceValue": 10801.7703
    },
    {
        "date": "22/11/2021",
        "navValue": 10613.463,
        "performanceValue": 10600.1019
    },
    {
        "date": "23/11/2021",
        "navValue": 10386.6237,
        "performanceValue": 10364.8048
    },
    {
        "date": "24/11/2021",
        "navValue": 10219.0147,
        "performanceValue": 10212.1714
    },
    {
        "date": "25/11/2021",
        "navValue": 10115.9908,
        "performanceValue": 10113.572
    },
    {
        "date": "26/11/2021",
        "navValue": 10168.5032,
        "performanceValue": 10165.1501
    },
    {
        "date": "29/11/2021",
        "navValue": 10518.0112,
        "performanceValue": 10488.1657
    },
    {
        "date": "30/11/2021",
        "navValue": 10518.4267,
        "performanceValue": 10477.4422
    },
    {
        "date": "01/12/2021",
        "navValue": 10600.5114,
        "performanceValue": 10553.9464
    },
    {
        "date": "02/12/2021",
        "navValue": 10000.3828,
        "performanceValue": 9953.5067
    },
    {
        "date": "03/12/2021",
        "navValue": 9915.1049,
        "performanceValue": 9908.8983
    },
    {
        "date": "06/12/2021",
        "navValue": 9964.8468,
        "performanceValue": 9962.0807
    },
    {
        "date": "07/12/2021",
        "navValue": 10136.0536,
        "performanceValue": 10122.5495
    },
    {
        "date": "08/12/2021",
        "navValue": 10097.4403,
        "performanceValue": 10103.2005
    },
    {
        "date": "09/12/2021",
        "navValue": 10004.9487,
        "performanceValue": 10029.354
    },
    {
        "date": "10/12/2021",
        "navValue": 9981.3768,
        "performanceValue": 9987.8797
    },
    {
        "date": "13/12/2021",
        "navValue": 9869.6644,
        "performanceValue": 9861.5721
    },
    {
        "date": "14/12/2021",
        "navValue": 9973.9837,
        "performanceValue": 9944.9743
    },
    {
        "date": "15/12/2021",
        "navValue": 10345.1753,
        "performanceValue": 10289.998
    },
    {
        "date": "16/12/2021",
        "navValue": 10187.6604,
        "performanceValue": 10128.493
    },
    {
        "date": "17/12/2021",
        "navValue": 10241.2645,
        "performanceValue": 10183.7362
    },
    {
        "date": "20/12/2021",
        "navValue": 10352.4265,
        "performanceValue": 10288.959
    },
    {
        "date": "21/12/2021",
        "navValue": 10276.2808,
        "performanceValue": 10200.1499
    },
    {
        "date": "22/12/2021",
        "navValue": 10274.6737,
        "performanceValue": 10192.7509
    },
    {
        "date": "23/12/2021",
        "navValue": 10283.2221,
        "performanceValue": 10198.4526
    },
    {
        "date": "24/12/2021",
        "navValue": 10256.4483,
        "performanceValue": 10159.1651
    },
    {
        "date": "27/12/2021",
        "navValue": 10207.4544,
        "performanceValue": 10105.904
    },
    {
        "date": "28/12/2021",
        "navValue": 10225.2584,
        "performanceValue": 10127.0375
    },
    {
        "date": "29/12/2021",
        "navValue": 10279.3233,
        "performanceValue": 10187.1194
    },
    {
        "date": "30/12/2021",
        "navValue": 10303.4459,
        "performanceValue": 10208.5163
    },
    {
        "date": "31/12/2021",
        "navValue": 10359.3013,
        "performanceValue": 10259.3831
    },
    {
        "date": "31/12/2021",
        "navValue": 10359.3013,
        "performanceValue": 10259.3831
    },
    {
        "date": "03/01/2022",
        "navValue": 10449.1928,
        "performanceValue": 10361.3042
    },
    {
        "date": "04/01/2022",
        "navValue": 10591.2678,
        "performanceValue": 10518.4428
    },
    {
        "date": "05/01/2022",
        "navValue": 10594.6461,
        "performanceValue": 10526.4028
    },
    {
        "date": "06/01/2022",
        "navValue": 10547.7622,
        "performanceValue": 10468.2071
    },
    {
        "date": "07/01/2022",
        "navValue": 10635.4456,
        "performanceValue": 10571.1386
    },
    {
        "date": "10/01/2022",
        "navValue": 10712.3509,
        "performanceValue": 10651.4925
    },
    {
        "date": "11/01/2022",
        "navValue": 10643.2872,
        "performanceValue": 10586.499
    },
    {
        "date": "12/01/2022",
        "navValue": 10676.574,
        "performanceValue": 10620.7088
    },
    {
        "date": "13/01/2022",
        "navValue": 10644.3217,
        "performanceValue": 10592.089
    },
    {
        "date": "14/01/2022",
        "navValue": 10629.9106,
        "performanceValue": 10567.7869
    },
    {
        "date": "17/01/2022",
        "navValue": 10640.2468,
        "performanceValue": 10564.3722
    },
    {
        "date": "18/01/2022",
        "navValue": 10628.2274,
        "performanceValue": 10556.4251
    },
    {
        "date": "19/01/2022",
        "navValue": 10471.1321,
        "performanceValue": 10381.6478
    },
    {
        "date": "20/01/2022",
        "navValue": 10503.9138,
        "performanceValue": 10422.1861
    },
    {
        "date": "21/01/2022",
        "navValue": 10527.7235,
        "performanceValue": 10447.5516
    },
    {
        "date": "24/01/2022",
        "navValue": 10523.6697,
        "performanceValue": 10444.6206
    },
    {
        "date": "25/01/2022",
        "navValue": 10528.6582,
        "performanceValue": 10452.6121
    },
    {
        "date": "26/01/2022",
        "navValue": 10525.7679,
        "performanceValue": 10455.7419
    },
    {
        "date": "27/01/2022",
        "navValue": 10556.8067,
        "performanceValue": 10493.3751
    },
    {
        "date": "28/01/2022",
        "navValue": 10527.8026,
        "performanceValue": 10469.7485
    },
    {
        "date": "31/01/2022",
        "navValue": 10576.8259,
        "performanceValue": 10532.0958
    },
    {
        "date": "01/02/2022",
        "navValue": 10639.349,
        "performanceValue": 10606.0225
    },
    {
        "date": "02/02/2022",
        "navValue": 10750.9638,
        "performanceValue": 10731.5488
    },
    {
        "date": "03/02/2022",
        "navValue": 10693.2179,
        "performanceValue": 10666.757
    },
    {
        "date": "04/02/2022",
        "navValue": 10691.9688,
        "performanceValue": 10670.5037
    },
    {
        "date": "07/02/2022",
        "navValue": 10707.4124,
        "performanceValue": 10674.6254
    },
    {
        "date": "08/02/2022",
        "navValue": 10749.1954,
        "performanceValue": 10715.5401
    },
    {
        "date": "09/02/2022",
        "navValue": 10837.5431,
        "performanceValue": 10804.5967
    },
    {
        "date": "10/02/2022",
        "navValue": 10735.0022,
        "performanceValue": 10710.3809
    },
    {
        "date": "11/02/2022",
        "navValue": 10732.6006,
        "performanceValue": 10698.8302
    },
    {
        "date": "14/02/2022",
        "navValue": 10631.6458,
        "performanceValue": 10589.0049
    },
    {
        "date": "15/02/2022",
        "navValue": 10630.2768,
        "performanceValue": 10601.4672
    },
    {
        "date": "16/02/2022",
        "navValue": 10627.0084,
        "performanceValue": 10595.3434
    },
    {
        "date": "17/02/2022",
        "navValue": 10557.0067,
        "performanceValue": 10520.0772
    },
    {
        "date": "18/02/2022",
        "navValue": 10630.6516,
        "performanceValue": 10583.9745
    },
    {
        "date": "21/02/2022",
        "navValue": 10548.4449,
        "performanceValue": 10491.7994
    },
    {
        "date": "22/02/2022",
        "navValue": 10478.0997,
        "performanceValue": 10408.6462
    },
    {
        "date": "23/02/2022",
        "navValue": 10512.8623,
        "performanceValue": 10442.7916
    },
    {
        "date": "24/02/2022",
        "navValue": 10187.8419,
        "performanceValue": 10108.8364
    },
    {
        "date": "25/02/2022",
        "navValue": 10217.3369,
        "performanceValue": 10135.2694
    },
    {
        "date": "28/02/2022",
        "navValue": 10402.1201,
        "performanceValue": 10325.4658
    },
    {
        "date": "01/03/2022",
        "navValue": 10480.0899,
        "performanceValue": 10426.5311
    },
    {
        "date": "02/03/2022",
        "navValue": 10384.5966,
        "performanceValue": 10337.8623
    },
    {
        "date": "03/03/2022",
        "navValue": 10399.7372,
        "performanceValue": 10366.568
    },
    {
        "date": "04/03/2022",
        "navValue": 10414.4347,
        "performanceValue": 10374.9687
    },
    {
        "date": "07/03/2022",
        "navValue": 10061.9011,
        "performanceValue": 9998.3184
    },
    {
        "date": "08/03/2022",
        "navValue": 9942.8289,
        "performanceValue": 9868.3857
    },
    {
        "date": "09/03/2022",
        "navValue": 10006.4818,
        "performanceValue": 9931.5131
    },
    {
        "date": "10/03/2022",
        "navValue": 10273.4214,
        "performanceValue": 10182.6028
    },
    {
        "date": "11/03/2022",
        "navValue": 10211.2379,
        "performanceValue": 10110.2517
    },
    {
        "date": "14/03/2022",
        "navValue": 10118.4102,
        "performanceValue": 10018.1024
    },
    {
        "date": "15/03/2022",
        "navValue": 10216.8531,
        "performanceValue": 10108.427
    },
    {
        "date": "16/03/2022",
        "navValue": 10324.0427,
        "performanceValue": 10203.1682
    },
    {
        "date": "17/03/2022",
        "navValue": 10262.1664,
        "performanceValue": 10137.7124
    },
    {
        "date": "18/03/2022",
        "navValue": 10022.209,
        "performanceValue": 9894.8245
    },
    {
        "date": "21/03/2022",
        "navValue": 10070.7435,
        "performanceValue": 9939.8566
    },
    {
        "date": "22/03/2022",
        "navValue": 10059.4517,
        "performanceValue": 9938.4068
    },
    {
        "date": "23/03/2022",
        "navValue": 10059.245,
        "performanceValue": 9938.4068
    },
    {
        "date": "24/03/2022",
        "navValue": 10137.7282,
        "performanceValue": 10027.0084
    },
    {
        "date": "25/03/2022",
        "navValue": 10138.0262,
        "performanceValue": 10030.9068
    },
    {
        "date": "28/03/2022",
        "navValue": 10250.7956,
        "performanceValue": 10148.4187
    },
    {
        "date": "29/03/2022",
        "navValue": 10416.5355,
        "performanceValue": 10313.7348
    },
    {
        "date": "30/03/2022",
        "navValue": 10389.3777,
        "performanceValue": 10286.8309
    },
    {
        "date": "31/03/2022",
        "navValue": 10532.1818,
        "performanceValue": 10435.1078
    },
    {
        "date": "01/04/2022",
        "navValue": 10571.471,
        "performanceValue": 10481.5253
    },
    {
        "date": "04/04/2022",
        "navValue": 10571.471,
        "performanceValue": 10127.1992
    },
    {
        "date": "05/04/2022",
        "navValue": 10559.3179,
        "performanceValue": 10122.6153
    },
    {
        "date": "06/04/2022",
        "navValue": 10617.9392,
        "performanceValue": 10200.7767
    },
    {
        "date": "07/04/2022",
        "navValue": 10517.8739,
        "performanceValue": 10105.9841
    },
    {
        "date": "08/04/2022",
        "navValue": 10674.2728,
        "performanceValue": 10263.7839
    },
    {
        "date": "11/04/2022",
        "navValue": 11140.6841,
        "performanceValue": 10715.4786
    },
    {
        "date": "12/04/2022",
        "navValue": 11189.7293,
        "performanceValue": 10787.5147
    },
    {
        "date": "13/04/2022",
        "navValue": 11147.6237,
        "performanceValue": 10741.8902
    },
    {
        "date": "14/04/2022",
        "navValue": 11257.5418,
        "performanceValue": 10867.9459
    },
    {
        "date": "15/04/2022",
        "navValue": 11277.4853,
        "performanceValue": 10882.1786
    },
    {
        "date": "18/04/2022",
        "navValue": 11323.6311,
        "performanceValue": 10918.5966
    },
    {
        "date": "19/04/2022",
        "navValue": 11258.8726,
        "performanceValue": 10857.9423
    },
    {
        "date": "20/04/2022",
        "navValue": 11122.0358,
        "performanceValue": 10732.4089
    },
    {
        "date": "21/04/2022",
        "navValue": 11035.1452,
        "performanceValue": 10646.9487
    },
    {
        "date": "22/04/2022",
        "navValue": 11050.8954,
        "performanceValue": 10670.5395
    },
    {
        "date": "25/04/2022",
        "navValue": 11184.4968,
        "performanceValue": 10813.9793
    },
    {
        "date": "26/04/2022",
        "navValue": 11093.0587,
        "performanceValue": 10726.8776
    },
    {
        "date": "27/04/2022",
        "navValue": 11024.8432,
        "performanceValue": 10654.9244
    },
    {
        "date": "28/04/2022",
        "navValue": 10960.9356,
        "performanceValue": 10592.1377
    },
    {
        "date": "29/04/2022",
        "navValue": 10960.7103,
        "performanceValue": 10592.1377
    },
    {
        "date": "02/05/2022",
        "navValue": 10960.4851,
        "performanceValue": 10592.1377
    },
    {
        "date": "03/05/2022",
        "navValue": 10960.2599,
        "performanceValue": 10592.1377
    },
    {
        "date": "04/05/2022",
        "navValue": 10960.0347,
        "performanceValue": 10592.1377
    },
    {
        "date": "05/05/2022",
        "navValue": 10959.8095,
        "performanceValue": 10592.1377
    },
    {
        "date": "06/05/2022",
        "navValue": 10820.7858,
        "performanceValue": 10445.7813
    },
    {
        "date": "09/05/2022",
        "navValue": 10392.7131,
        "performanceValue": 10022.642
    },
    {
        "date": "10/05/2022",
        "navValue": 10405.9515,
        "performanceValue": 10029.5458
    },
    {
        "date": "11/05/2022",
        "navValue": 10246.4145,
        "performanceValue": 9875.7847
    },
    {
        "date": "12/05/2022",
        "navValue": 10299.0207,
        "performanceValue": 9923.0221
    },
    {
        "date": "13/05/2022",
        "navValue": 10454.8256,
        "performanceValue": 10092.6974
    },
    {
        "date": "16/05/2022",
        "navValue": 10200.2192,
        "performanceValue": 9855.0475
    },
    {
        "date": "17/05/2022",
        "navValue": 10190.7397,
        "performanceValue": 9854.1889
    },
    {
        "date": "18/05/2022",
        "navValue": 10285.1636,
        "performanceValue": 9948.1357
    },
    {
        "date": "19/05/2022",
        "navValue": 10269.8803,
        "performanceValue": 9940.8727
    },
    {
        "date": "20/05/2022",
        "navValue": 10280.143,
        "performanceValue": 9944.0555
    },
    {
        "date": "23/05/2022",
        "navValue": 10061.7663,
        "performanceValue": 9735.8827
    },
    {
        "date": "24/05/2022",
        "navValue": 9908.5913,
        "performanceValue": 9600.838
    },
    {
        "date": "25/05/2022",
        "navValue": 9924.7687,
        "performanceValue": 9626.0173
    },
    {
        "date": "26/05/2022",
        "navValue": 10083.6474,
        "performanceValue": 9797.2369
    },
    {
        "date": "27/05/2022",
        "navValue": 10170.4159,
        "performanceValue": 9882.7557
    },
    {
        "date": "30/05/2022",
        "navValue": 10253.0652,
        "performanceValue": 9968.3848
    },
    {
        "date": "31/05/2022",
        "navValue": 10291,
        "performanceValue": 10024.4481
    },
    {
        "date": "01/06/2022",
        "navValue": 10199.2938,
        "performanceValue": 9939.5346
    },
    {
        "date": "02/06/2022",
        "navValue": 10068.9803,
        "performanceValue": 9826.4062
    },
    {
        "date": "03/06/2022",
        "navValue": 9811.8936,
        "performanceValue": 9567.2993
    },
    {
        "date": "06/06/2022",
        "navValue": 9904.5017,
        "performanceValue": 9655.3284
    },
    {
        "date": "07/06/2022",
        "navValue": 9911.8632,
        "performanceValue": 9666.4369
    },
    {
        "date": "08/06/2022",
        "navValue": 9946.933,
        "performanceValue": 9699.2328
    },
    {
        "date": "09/06/2022",
        "navValue": 10005.8183,
        "performanceValue": 9756.8331
    },
    {
        "date": "10/06/2022",
        "navValue": 10096.1636,
        "performanceValue": 9853.3745
    },
    {
        "date": "13/06/2022",
        "navValue": 9840.1023,
        "performanceValue": 9603.4598
    },
    {
        "date": "14/06/2022",
        "navValue": 9878.6586,
        "performanceValue": 9644.4947
    },
    {
        "date": "15/06/2022",
        "navValue": 9982.9351,
        "performanceValue": 9743.6752
    },
    {
        "date": "16/06/2022",
        "navValue": 10081.3128,
        "performanceValue": 9840.772
    },
    {
        "date": "17/06/2022",
        "navValue": 10232.6704,
        "performanceValue": 9995.0755
    },
    {
        "date": "20/06/2022",
        "navValue": 10112.3743,
        "performanceValue": 9876.9725
    },
    {
        "date": "21/06/2022",
        "navValue": 10312.9228,
        "performanceValue": 10085.8495
    },
    {
        "date": "22/06/2022",
        "navValue": 10256.3051,
        "performanceValue": 10034.7064
    },
    {
        "date": "23/06/2022",
        "navValue": 10326.7484,
        "performanceValue": 10108.7018
    },
    {
        "date": "24/06/2022",
        "navValue": 9865.6531,
        "performanceValue": 9662.0619
    },
    {
        "date": "27/06/2022",
        "navValue": 10072.7129,
        "performanceValue": 9865.3946
    },
    {
        "date": "28/06/2022",
        "navValue": 10073.7806,
        "performanceValue": 9845.5262
    },
    {
        "date": "29/06/2022",
        "navValue": 9989.8127,
        "performanceValue": 9761.3426
    },
    {
        "date": "30/06/2022",
        "navValue": 10075.6995,
        "performanceValue": 9841.3931
    },
    {
        "date": "01/07/2022",
        "navValue": 10066.4319,
        "performanceValue": 9835.1762
    },
    {
        "date": "04/07/2022",
        "navValue": 9981.0434,
        "performanceValue": 9747.9414
    },
    {
        "date": "05/07/2022",
        "navValue": 9914.1892,
        "performanceValue": 9686.2652
    },
    {
        "date": "06/07/2022",
        "navValue": 9915.7254,
        "performanceValue": 9689.0631
    },
    {
        "date": "07/07/2022",
        "navValue": 9960.9766,
        "performanceValue": 9724.1617
    },
    {
        "date": "08/07/2022",
        "navValue": 9960.772,
        "performanceValue": 9724.1617
    },
    {
        "date": "11/07/2022",
        "navValue": 9960.5673,
        "performanceValue": 9724.1617
    },
    {
        "date": "12/07/2022",
        "navValue": 9960.3626,
        "performanceValue": 9724.1617
    },
    {
        "date": "13/07/2022",
        "navValue": 10114.6134,
        "performanceValue": 9882.2019
    },
    {
        "date": "14/07/2022",
        "navValue": 10277.5892,
        "performanceValue": 10030.4846
    },
    {
        "date": "14/07/2022",
        "navValue": 10277.5892,
        "performanceValue": 10030.4846
    },
    {
        "date": "15/07/2022",
        "navValue": 10222.4758,
        "performanceValue": 9971.4188
    },
    {
        "date": "18/07/2022",
        "navValue": 10042.6118,
        "performanceValue": 9789.5831
    },
    {
        "date": "19/07/2022",
        "navValue": 9763.6766,
        "performanceValue": 9497.7662
    },
    {
        "date": "20/07/2022",
        "navValue": 9769.5399,
        "performanceValue": 9503.0585
    },
    {
        "date": "21/07/2022",
        "navValue": 9587.2556,
        "performanceValue": 9323.547
    },
    {
        "date": "22/07/2022",
        "navValue": 9686.1503,
        "performanceValue": 9419.6449
    },
    {
        "date": "25/07/2022",
        "navValue": 9638.6587,
        "performanceValue": 9373.2833
    },
    {
        "date": "26/07/2022",
        "navValue": 9647.0771,
        "performanceValue": 9385.5123
    },
    {
        "date": "27/07/2022",
        "navValue": 9651.317,
        "performanceValue": 9390.6258
    },
    {
        "date": "28/07/2022",
        "navValue": 9680.9963,
        "performanceValue": 9426.0907
    },
    {
        "date": "29/07/2022",
        "navValue": 9613.6112,
        "performanceValue": 9366.2034
    },
    {
        "date": "01/08/2022",
        "navValue": 9580.3989,
        "performanceValue": 9342.6541
    },
    {
        "date": "02/08/2022",
        "navValue": 9645.1376,
        "performanceValue": 9400.8999
    },
    {
        "date": "03/08/2022",
        "navValue": 9870.3875,
        "performanceValue": 9625.9816
    },
    {
        "date": "04/08/2022",
        "navValue": 9948.6093,
        "performanceValue": 9688.8227
    },
    {
        "date": "05/08/2022",
        "navValue": 10074.2156,
        "performanceValue": 9824.6302
    },
    {
        "date": "08/08/2022",
        "navValue": 10074.0086,
        "performanceValue": 9824.6302
    },
    {
        "date": "09/08/2022",
        "navValue": 10073.8016,
        "performanceValue": 9824.6302
    },
    {
        "date": "10/08/2022",
        "navValue": 10183.0297,
        "performanceValue": 9932.5964
    },
    {
        "date": "11/08/2022",
        "navValue": 10143.6695,
        "performanceValue": 9889.4305
    },
    {
        "date": "12/08/2022",
        "navValue": 10294.4241,
        "performanceValue": 10054.5019
    },
    {
        "date": "15/08/2022",
        "navValue": 10446.5945,
        "performanceValue": 10221.3922
    },
    {
        "date": "16/08/2022",
        "navValue": 10427.9009,
        "performanceValue": 10185.7355
    },
    {
        "date": "17/08/2022",
        "navValue": 10529.1446,
        "performanceValue": 10275.4691
    },
    {
        "date": "18/08/2022",
        "navValue": 10479.658,
        "performanceValue": 10242.7677
    },
    {
        "date": "19/08/2022",
        "navValue": 10442.9298,
        "performanceValue": 10205.9002
    },
    {
        "date": "22/08/2022",
        "navValue": 10365.3687,
        "performanceValue": 10128.005
    },
    {
        "date": "23/08/2022",
        "navValue": 10548.6933,
        "performanceValue": 10322.2171
    },
    {
        "date": "24/08/2022",
        "navValue": 10564.9721,
        "performanceValue": 10332.0976
    },
    {
        "date": "25/08/2022",
        "navValue": 10457.8896,
        "performanceValue": 10226.2609
    },
    {
        "date": "26/08/2022",
        "navValue": 10316.3701,
        "performanceValue": 10075.1102
    },
    {
        "date": "29/08/2022",
        "navValue": 10313.445,
        "performanceValue": 10059.4465
    },
    {
        "date": "30/08/2022",
        "navValue": 10241.0703,
        "performanceValue": 9995.8769
    },
    {
        "date": "31/08/2022",
        "navValue": 10325.0975,
        "performanceValue": 10067.5667
    },
    {
        "date": "01/09/2022",
        "navValue": 10341.992,
        "performanceValue": 10095.1919
    },
    {
        "date": "02/09/2022",
        "navValue": 10285.6568,
        "performanceValue": 10031.4907
    },
    {
        "date": "05/09/2022",
        "navValue": 10162.2656,
        "performanceValue": 9902.9576
    },
    {
        "date": "06/09/2022",
        "navValue": 10157.6507,
        "performanceValue": 9902.856
    },
    {
        "date": "07/09/2022",
        "navValue": 10123.0056,
        "performanceValue": 9874.0187
    },
    {
        "date": "08/09/2022",
        "navValue": 10138.9909,
        "performanceValue": 9894.5397
    },
    {
        "date": "09/09/2022",
        "navValue": 10147.5402,
        "performanceValue": 9906.2707
    },
    {
        "date": "12/09/2022",
        "navValue": 10127.9044,
        "performanceValue": 9889.1014
    },
    {
        "date": "13/09/2022",
        "navValue": 10157.6921,
        "performanceValue": 9924.2128
    },
    {
        "date": "14/09/2022",
        "navValue": 10181.0092,
        "performanceValue": 9941.9446
    },
    {
        "date": "15/09/2022",
        "navValue": 10090.5508,
        "performanceValue": 9862.1617
    },
    {
        "date": "16/09/2022",
        "navValue": 10057.7838,
        "performanceValue": 9820.3425
    },
    {
        "date": "19/09/2022",
        "navValue": 10014.0572,
        "performanceValue": 9774.5047
    },
    {
        "date": "20/09/2022",
        "navValue": 9923.9243,
        "performanceValue": 9698.0621
    },
    {
        "date": "21/09/2022",
        "navValue": 9834.8392,
        "performanceValue": 9590.2876
    },
    {
        "date": "22/09/2022",
        "navValue": 9824.0583,
        "performanceValue": 9574.8557
    },
    {
        "date": "23/09/2022",
        "navValue": 9742.1116,
        "performanceValue": 9491.9029
    },
    {
        "date": "26/09/2022",
        "navValue": 9865.4474,
        "performanceValue": 9635.7247
    },
    {
        "date": "27/09/2022",
        "navValue": 9974.2977,
        "performanceValue": 9726.6833
    },
    {
        "date": "28/09/2022",
        "navValue": 9939.1609,
        "performanceValue": 9687.1812
    },
    {
        "date": "29/09/2022",
        "navValue": 9879.2553,
        "performanceValue": 9630.3451
    },
    {
        "date": "30/09/2022",
        "navValue": 9899.2777,
        "performanceValue": 9654.8704
    },
    {
        "date": "03/10/2022",
        "navValue": 9956.395,
        "performanceValue": 9725.4139
    },
    {
        "date": "04/10/2022",
        "navValue": 9989.809,
        "performanceValue": 9781.3684
    },
    {
        "date": "05/10/2022",
        "navValue": 10056.9987,
        "performanceValue": 9851.5269
    },
    {
        "date": "06/10/2022",
        "navValue": 10236.1601,
        "performanceValue": 10042.2485
    },
    {
        "date": "07/10/2022",
        "navValue": 10220.0049,
        "performanceValue": 10017.7919
    },
    {
        "date": "10/10/2022",
        "navValue": 10219.2984,
        "performanceValue": 10031.0699
    },
    {
        "date": "11/10/2022",
        "navValue": 10230.1941,
        "performanceValue": 10056.328
    },
    {
        "date": "12/10/2022",
        "navValue": 10231.4437,
        "performanceValue": 10057.118
    },
    {
        "date": "13/10/2022",
        "navValue": 10265.561,
        "performanceValue": 10098.8027
    },
    {
        "date": "14/10/2022",
        "navValue": 10265.561,
        "performanceValue": 10060.215
    },
    {
        "date": "17/10/2022",
        "navValue": 10228.7649,
        "performanceValue": 10009.7718
    },
    {
        "date": "18/10/2022",
        "navValue": 10227.021,
        "performanceValue": 10020.1518
    },
    {
        "date": "19/10/2022",
        "navValue": 10339.7025,
        "performanceValue": 10150.7571
    },
    {
        "date": "20/10/2022",
        "navValue": 10333.1288,
        "performanceValue": 10138.0329
    },
    {
        "date": "21/10/2022",
        "navValue": 10367.2146,
        "performanceValue": 10181.9144
    },
    {
        "date": "24/10/2022",
        "navValue": 10411.3495,
        "performanceValue": 10216.6394
    },
    {
        "date": "25/10/2022",
        "navValue": 10412.7473,
        "performanceValue": 10216.087
    },
    {
        "date": "26/10/2022",
        "navValue": 10243.7231,
        "performanceValue": 10044.8546
    },
    {
        "date": "27/10/2022",
        "navValue": 10219.8318,
        "performanceValue": 10037.5286
    },
    {
        "date": "28/10/2022",
        "navValue": 10069.6607,
        "performanceValue": 9884.3185
    },
    {
        "date": "31/10/2022",
        "navValue": 10098.0401,
        "performanceValue": 9919.2411
    },
    {
        "date": "01/11/2022",
        "navValue": 10242.0578,
        "performanceValue": 10078.668
    },
    {
        "date": "02/11/2022",
        "navValue": 10317.9326,
        "performanceValue": 10153.7096
    },
    {
        "date": "03/11/2022",
        "navValue": 10346.6449,
        "performanceValue": 10182.4038
    },
    {
        "date": "04/11/2022",
        "navValue": 10259.2385,
        "performanceValue": 10102.3848
    },
    {
        "date": "07/11/2022",
        "navValue": 10311.7623,
        "performanceValue": 10158.8445
    },
    {
        "date": "08/11/2022",
        "navValue": 10394.2154,
        "performanceValue": 10245.3179
    },
    {
        "date": "09/11/2022",
        "navValue": 10394.0018,
        "performanceValue": 10245.3179
    },
    {
        "date": "10/11/2022",
        "navValue": 10546.6837,
        "performanceValue": 10398.0715
    },
    {
        "date": "11/11/2022",
        "navValue": 10617.6047,
        "performanceValue": 10462.3223
    },
    {
        "date": "14/11/2022",
        "navValue": 10504.6432,
        "performanceValue": 10351.8301
    },
    {
        "date": "15/11/2022",
        "navValue": 10523.1311,
        "performanceValue": 10360.7919
    },
    {
        "date": "16/11/2022",
        "navValue": 10571.0964,
        "performanceValue": 10424.6677
    },
    {
        "date": "17/11/2022",
        "navValue": 10524.0628,
        "performanceValue": 10374.7068
    },
    {
        "date": "18/11/2022",
        "navValue": 10513.0178,
        "performanceValue": 10356.0448
    },
    {
        "date": "21/11/2022",
        "navValue": 10495.6165,
        "performanceValue": 10354.1486
    },
    {
        "date": "22/11/2022",
        "navValue": 10544.9295,
        "performanceValue": 10421.3833
    },
    {
        "date": "23/11/2022",
        "navValue": 10543.601,
        "performanceValue": 10427.2767
    },
    {
        "date": "24/11/2022",
        "navValue": 10545.8991,
        "performanceValue": 10431.4971
    },
    {
        "date": "25/11/2022",
        "navValue": 10534.3368,
        "performanceValue": 10425.8269
    },
    {
        "date": "28/11/2022",
        "navValue": 10271.036,
        "performanceValue": 10159.4842
    },
    {
        "date": "29/11/2022",
        "navValue": 10353.8254,
        "performanceValue": 10251.6135
    },
    {
        "date": "30/11/2022",
        "navValue": 10368.8543,
        "performanceValue": 10271.0526
    },
    {
        "date": "01/12/2022",
        "navValue": 10362.0671,
        "performanceValue": 10271.8984
    },
    {
        "date": "02/12/2022",
        "navValue": 10297.1138,
        "performanceValue": 10203.8208
    },
    {
        "date": "05/12/2022",
        "navValue": 10127.1631,
        "performanceValue": 10022.9497
    },
    {
        "date": "06/12/2022",
        "navValue": 10093.2718,
        "performanceValue": 9993.3796
    },
    {
        "date": "07/12/2022",
        "navValue": 10144.4734,
        "performanceValue": 10053.1395
    },
    {
        "date": "08/12/2022",
        "navValue": 10095.3986,
        "performanceValue": 10010.0323
    },
    {
        "date": "09/12/2022",
        "navValue": 10095.4577,
        "performanceValue": 10010.9224
    },
    {
        "date": "12/12/2022",
        "navValue": 10065.4984,
        "performanceValue": 9989.5241
    },
    {
        "date": "13/12/2022",
        "navValue": 10083.6138,
        "performanceValue": 10026.9697
    },
    {
        "date": "14/12/2022",
        "navValue": 10117.5287,
        "performanceValue": 10059.7627
    },
    {
        "date": "15/12/2022",
        "navValue": 9973.1276,
        "performanceValue": 9929.6526
    },
    {
        "date": "16/12/2022",
        "navValue": 9993.4838,
        "performanceValue": 9947.3629
    },
    {
        "date": "19/12/2022",
        "navValue": 9875.9523,
        "performanceValue": 9813.1224
    },
    {
        "date": "20/12/2022",
        "navValue": 9572.1012,
        "performanceValue": 9517.3169
    },
    {
        "date": "21/12/2022",
        "navValue": 9486.0884,
        "performanceValue": 9427.7065
    },
    {
        "date": "22/12/2022",
        "navValue": 9635.8824,
        "performanceValue": 9589.1227
    },
    {
        "date": "23/12/2022",
        "navValue": 9642.3436,
        "performanceValue": 9563.4939
    },
    {
        "date": "26/12/2022",
        "navValue": 9779.7306,
        "performanceValue": 9697.9104
    },
    {
        "date": "27/12/2022",
        "navValue": 9688.1711,
        "performanceValue": 9620.2842
    },
    {
        "date": "28/12/2022",
        "navValue": 9571.1641,
        "performanceValue": 9502.8696
    },
    {
        "date": "29/12/2022",
        "navValue": 9727.5066,
        "performanceValue": 9653.6039
    },
    {
        "date": "30/12/2022",
        "navValue": 9866.8514,
        "performanceValue": 9771.4793
    },
    {
        "date": "02/01/2023",
        "navValue": 9950.0507,
        "performanceValue": 9879.5428
    },
    {
        "date": "03/01/2023",
        "navValue": 9914.6194,
        "performanceValue": 9845.6249
    },
    {
        "date": "04/01/2023",
        "navValue": 9872.4724,
        "performanceValue": 9813.7865
    },
    {
        "date": "05/01/2023",
        "navValue": 9924.3458,
        "performanceValue": 9882.7085
    },
    {
        "date": "06/01/2023",
        "navValue": 9991.7172,
        "performanceValue": 10031.8928
    },
    {
        "date": "09/01/2023",
        "navValue": 9912.2662,
        "performanceValue": 9966.8549
    },
    {
        "date": "10/01/2023",
        "navValue": 10011.8151,
        "performanceValue": 10077.7893
    },
    {
        "date": "11/01/2023",
        "navValue": 10015.7943,
        "performanceValue": 10102.9916
    },
    {
        "date": "11/01/2023",
        "navValue": 10015.7943,
        "performanceValue": 10102.9916
    },
    {
        "date": "12/01/2023",
        "navValue": 9990.3597,
        "performanceValue": 10091.584
    },
    {
        "date": "13/01/2023",
        "navValue": 9822.2781,
        "performanceValue": 9916.3459
    },
    {
        "date": "16/01/2023",
        "navValue": 9629.5779,
        "performanceValue": 9725.1062
    },
    {
        "date": "17/01/2023",
        "navValue": 9181.4291,
        "performanceValue": 9276.8262
    },
    {
        "date": "18/01/2023",
        "navValue": 9378.2658,
        "performanceValue": 9477.1378
    },
    {
        "date": "19/01/2023",
        "navValue": 9419.2901,
        "performanceValue": 9511.1702
    },
    {
        "date": "20/01/2023",
        "navValue": 9290.2328,
        "performanceValue": 9386.2436
    },
    {
        "date": "23/01/2023",
        "navValue": 9342.2311,
        "performanceValue": 9422.198
    },
    {
        "date": "24/01/2023",
        "navValue": 9512.3508,
        "performanceValue": 9587.0719
    },
    {
        "date": "25/01/2023",
        "navValue": 9677.8409,
        "performanceValue": 9749.2166
    },
    {
        "date": "26/01/2023",
        "navValue": 9905.7885,
        "performanceValue": 9985.5355
    },
    {
        "date": "27/01/2023",
        "navValue": 9763.8829,
        "performanceValue": 9836.51
    },
    {
        "date": "30/01/2023",
        "navValue": 9653.4359,
        "performanceValue": 9731.0769
    },
    {
        "date": "31/01/2023",
        "navValue": 9857.8337,
        "performanceValue": 9937.7099
    },
    {
        "date": "01/02/2023",
        "navValue": 9843.9445,
        "performanceValue": 9927.9409
    },
    {
        "date": "02/02/2023",
        "navValue": 9912.1214,
        "performanceValue": 10007.7281
    },
    {
        "date": "03/02/2023",
        "navValue": 9834.8665,
        "performanceValue": 9924.6837
    },
    {
        "date": "06/02/2023",
        "navValue": 10109.8213,
        "performanceValue": 10184.1999
    },
    {
        "date": "07/02/2023",
        "navValue": 10226.5285,
        "performanceValue": 10297.3354
    },
    {
        "date": "08/02/2023",
        "navValue": 10302.6633,
        "performanceValue": 10368.0048
    },
    {
        "date": "09/02/2023",
        "navValue": 10499.1559,
        "performanceValue": 10557.447
    },
    {
        "date": "10/02/2023",
        "navValue": 10272.7193,
        "performanceValue": 10331.2933
    },
    {
        "date": "13/02/2023",
        "navValue": 10229.042,
        "performanceValue": 10273.9621
    },
    {
        "date": "14/02/2023",
        "navValue": 10089.2146,
        "performanceValue": 10153.2416
    },
    {
        "date": "15/02/2023",
        "navValue": 10177.3914,
        "performanceValue": 10233.3622
    },
    {
        "date": "16/02/2023",
        "navValue": 10101.2361,
        "performanceValue": 10150.6183
    },
    {
        "date": "17/02/2023",
        "navValue": 10104.7084,
        "performanceValue": 10158.3479
    },
    {
        "date": "20/02/2023",
        "navValue": 9981.0784,
        "performanceValue": 10044.3237
    },
    {
        "date": "21/02/2023",
        "navValue": 10066.0538,
        "performanceValue": 10125.3703
    },
    {
        "date": "22/02/2023",
        "navValue": 10077.7265,
        "performanceValue": 10139.1063
    },
    {
        "date": "23/02/2023",
        "navValue": 9974.4867,
        "performanceValue": 10030.9927
    },
    {
        "date": "24/02/2023",
        "navValue": 9947.7888,
        "performanceValue": 10009.2738
    },
    {
        "date": "27/02/2023",
        "navValue": 9908.9675,
        "performanceValue": 9976.1244
    },
    {
        "date": "28/02/2023",
        "navValue": 9762.0776,
        "performanceValue": 9840.8263
    },
    {
        "date": "01/03/2023",
        "navValue": 9704.2823,
        "performanceValue": 9789.9252
    },
    {
        "date": "02/03/2023",
        "navValue": 9809.2426,
        "performanceValue": 9900.0996
    },
    {
        "date": "03/03/2023",
        "navValue": 10054.4723,
        "performanceValue": 10123.5041
    },
    {
        "date": "06/03/2023",
        "navValue": 10075.3373,
        "performanceValue": 10143.122
    },
    {
        "date": "07/03/2023",
        "navValue": 10056.3542,
        "performanceValue": 10137.6837
    },
    {
        "date": "08/03/2023",
        "navValue": 10069.6777,
        "performanceValue": 10138.6955
    },
    {
        "date": "09/03/2023",
        "navValue": 10166.1605,
        "performanceValue": 10228.1085
    },
    {
        "date": "10/03/2023",
        "navValue": 10205.2205,
        "performanceValue": 10272.0086
    },
    {
        "date": "13/03/2023",
        "navValue": 10323.6624,
        "performanceValue": 10379.743
    },
    {
        "date": "14/03/2023",
        "navValue": 10267.8837,
        "performanceValue": 10342.4032
    },
    {
        "date": "15/03/2023",
        "navValue": 10299.5099,
        "performanceValue": 10374.5036
    },
    {
        "date": "16/03/2023",
        "navValue": 10231.0281,
        "performanceValue": 10299.8098
    },
    {
        "date": "17/03/2023",
        "navValue": 10137.4656,
        "performanceValue": 10212.7825
    },
    {
        "date": "20/03/2023",
        "navValue": 9986.803,
        "performanceValue": 10071.5939
    },
    {
        "date": "21/03/2023",
        "navValue": 10018.366,
        "performanceValue": 10102.2345
    },
    {
        "date": "22/03/2023",
        "navValue": 9875.9506,
        "performanceValue": 9952.1343
    },
    {
        "date": "23/03/2023",
        "navValue": 9875.7476,
        "performanceValue": 9952.1343
    },
    {
        "date": "24/03/2023",
        "navValue": 9765.0135,
        "performanceValue": 9843.0246
    },
    {
        "date": "27/03/2023",
        "navValue": 9783.5157,
        "performanceValue": 9863.3825
    },
    {
        "date": "28/03/2023",
        "navValue": 9799.3231,
        "performanceValue": 9892.3014
    },
    {
        "date": "29/03/2023",
        "navValue": 9766.7414,
        "performanceValue": 9870.7886
    },
    {
        "date": "30/03/2023",
        "navValue": 9791.6363,
        "performanceValue": 9887.198
    },
    {
        "date": "31/03/2023",
        "navValue": 9827.7085,
        "performanceValue": 9923.191
    },
    {
        "date": "03/04/2023",
        "navValue": 9809.1912,
        "performanceValue": 9915.5402
    },
    {
        "date": "04/04/2023",
        "navValue": 9751.6092,
        "performanceValue": 9849.2343
    },
    {
        "date": "05/04/2023",
        "navValue": 9750.6788,
        "performanceValue": 9849.625
    },
    {
        "date": "06/04/2023",
        "navValue": 9993.4958,
        "performanceValue": 10079.8602
    },
    {
        "date": "07/04/2023",
        "navValue": 9886.2651,
        "performanceValue": 9983.592
    },
    {
        "date": "10/04/2023",
        "navValue": 9828.3622,
        "performanceValue": 9926.0933
    },
    {
        "date": "11/04/2023",
        "navValue": 9828.8469,
        "performanceValue": 9924.2558
    },
    {
        "date": "12/04/2023",
        "navValue": 9828.8469,
        "performanceValue": 10021.4727
    },
    {
        "date": "13/04/2023",
        "navValue": 9848.3393,
        "performanceValue": 10036.2907
    },
    {
        "date": "14/04/2023",
        "navValue": 9848.1369,
        "performanceValue": 10036.2907
    },
    {
        "date": "17/04/2023",
        "navValue": 9833.007,
        "performanceValue": 10023.9758
    },
    {
        "date": "18/04/2023",
        "navValue": 9879.7411,
        "performanceValue": 10073.0093
    },
    {
        "date": "19/04/2023",
        "navValue": 9897.3297,
        "performanceValue": 10093.7908
    },
    {
        "date": "20/04/2023",
        "navValue": 10014.1954,
        "performanceValue": 10249.5627
    },
    {
        "date": "21/04/2023",
        "navValue": 10013.9897,
        "performanceValue": 10249.5627
    },
    {
        "date": "24/04/2023",
        "navValue": 10013.7839,
        "performanceValue": 10249.5627
    },
    {
        "date": "25/04/2023",
        "navValue": 10013.5781,
        "performanceValue": 10249.5627
    },
    {
        "date": "26/04/2023",
        "navValue": 9976.5126,
        "performanceValue": 10234.3769
    },
    {
        "date": "27/04/2023",
        "navValue": 10056.0303,
        "performanceValue": 10360.8134
    },
    {
        "date": "28/04/2023",
        "navValue": 10038.2546,
        "performanceValue": 10354.8842
    },
    {
        "date": "01/05/2023",
        "navValue": 10038.0483,
        "performanceValue": 10354.8842
    },
    {
        "date": "02/05/2023",
        "navValue": 10084.0753,
        "performanceValue": 10404.722
    },
    {
        "date": "03/05/2023",
        "navValue": 10127.1512,
        "performanceValue": 10466.3982
    },
    {
        "date": "04/05/2023",
        "navValue": 10108.4875,
        "performanceValue": 10434.939
    },
    {
        "date": "05/05/2023",
        "navValue": 10128.5077,
        "performanceValue": 10446.3494
    },
    {
        "date": "08/05/2023",
        "navValue": 9991.1335,
        "performanceValue": 10297.9193
    },
    {
        "date": "09/05/2023",
        "navValue": 9852.997,
        "performanceValue": 10145.6652
    },
    {
        "date": "10/05/2023",
        "navValue": 9772.9103,
        "performanceValue": 10072.6286
    },
    {
        "date": "11/05/2023",
        "navValue": 9838.0826,
        "performanceValue": 10144.5074
    },
    {
        "date": "12/05/2023",
        "navValue": 9861.2051,
        "performanceValue": 10197.4665
    },
    {
        "date": "15/05/2023",
        "navValue": 9898.7428,
        "performanceValue": 10250.9638
    },
    {
        "date": "16/05/2023",
        "navValue": 9978.0004,
        "performanceValue": 10318.9784
    },
    {
        "date": "17/05/2023",
        "navValue": 9901.6758,
        "performanceValue": 10230.2166
    },
    {
        "date": "18/05/2023",
        "navValue": 9796.6535,
        "performanceValue": 10136.4916
    },
    {
        "date": "19/05/2023",
        "navValue": 9846.5847,
        "performanceValue": 10177.2689
    },
    {
        "date": "22/05/2023",
        "navValue": 9756.4621,
        "performanceValue": 10101.8839
    },
    {
        "date": "23/05/2023",
        "navValue": 9719.0086,
        "performanceValue": 10072.1807
    },
    {
        "date": "24/05/2023",
        "navValue": 9716.6972,
        "performanceValue": 10053.1352
    },
    {
        "date": "25/05/2023",
        "navValue": 9723.723,
        "performanceValue": 10080.1536
    },
    {
        "date": "26/05/2023",
        "navValue": 9700.1481,
        "performanceValue": 10066.4504
    },
    {
        "date": "29/05/2023",
        "navValue": 9800.1864,
        "performanceValue": 10169.5093
    },
    {
        "date": "30/05/2023",
        "navValue": 9931.1171,
        "performanceValue": 10303.3934
    },
    {
        "date": "31/05/2023",
        "navValue": 9805.5985,
        "performanceValue": 10215.2799
    },
    {
        "date": "01/06/2023",
        "navValue": 9808.8771,
        "performanceValue": 10205.9589
    },
    {
        "date": "02/06/2023",
        "navValue": 9776.5905,
        "performanceValue": 10180.0525
    },
    {
        "date": "05/06/2023",
        "navValue": 9933.9196,
        "performanceValue": 10289.4055
    },
    {
        "date": "06/06/2023",
        "navValue": 10008.6225,
        "performanceValue": 10371.6728
    },
    {
        "date": "07/06/2023",
        "navValue": 10071.1407,
        "performanceValue": 10417.8398
    },
    {
        "date": "08/06/2023",
        "navValue": 9943.884,
        "performanceValue": 10286.3343
    },
    {
        "date": "09/06/2023",
        "navValue": 10013.8158,
        "performanceValue": 10345.1925
    },
    {
        "date": "12/06/2023",
        "navValue": 9985.9458,
        "performanceValue": 10320.514
    },
    {
        "date": "13/06/2023",
        "navValue": 9921.0351,
        "performanceValue": 10254.1266
    },
    {
        "date": "14/06/2023",
        "navValue": 9920.6356,
        "performanceValue": 10256.7642
    },
    {
        "date": "15/06/2023",
        "navValue": 9852.4625,
        "performanceValue": 10196.7409
    },
    {
        "date": "16/06/2023",
        "navValue": 9815.6345,
        "performanceValue": 10163.4842
    },
    {
        "date": "19/06/2023",
        "navValue": 9585.1684,
        "performanceValue": 9933.6211
    },
    {
        "date": "20/06/2023",
        "navValue": 9635.4943,
        "performanceValue": 9968.3662
    },
    {
        "date": "21/06/2023",
        "navValue": 9545.0507,
        "performanceValue": 9889.0355
    },
    {
        "date": "22/06/2023",
        "navValue": 9547.0417,
        "performanceValue": 9885.1257
    },
    {
        "date": "23/06/2023",
        "navValue": 9535.8674,
        "performanceValue": 9855.2407
    },
    {
        "date": "26/06/2023",
        "navValue": 9857.1623,
        "performanceValue": 10183.1165
    },
    {
        "date": "27/06/2023",
        "navValue": 9793.8446,
        "performanceValue": 10102.2789
    },
    {
        "date": "28/06/2023",
        "navValue": 9793.6433,
        "performanceValue": 10102.2789
    },
    {
        "date": "29/06/2023",
        "navValue": 9793.4421,
        "performanceValue": 10102.2789
    },
    {
        "date": "30/06/2023",
        "navValue": 9793.2408,
        "performanceValue": 10102.2789
    },
    {
        "date": "03/07/2023",
        "navValue": 10443.2602,
        "performanceValue": 10776.9315
    },
    {
        "date": "04/07/2023",
        "navValue": 10384.7517,
        "performanceValue": 10689.575
    },
    {
        "date": "05/07/2023",
        "navValue": 10373.8763,
        "performanceValue": 10672.3356
    },
    {
        "date": "06/07/2023",
        "navValue": 10560.5399,
        "performanceValue": 10864.2264
    },
    {
        "date": "07/07/2023",
        "navValue": 10559.1235,
        "performanceValue": 10839.1773
    },
    {
        "date": "07/07/2023",
        "navValue": 10559.1235,
        "performanceValue": 10839.1773
    },
    {
        "date": "10/07/2023",
        "navValue": 10594.268,
        "performanceValue": 10855.1745
    },
    {
        "date": "11/07/2023",
        "navValue": 10731.1798,
        "performanceValue": 10996.23
    },
    {
        "date": "12/07/2023",
        "navValue": 10842.2258,
        "performanceValue": 11120.9705
    },
    {
        "date": "13/07/2023",
        "navValue": 10761.6104,
        "performanceValue": 11035.2169
    },
    {
        "date": "14/07/2023",
        "navValue": 10702.3668,
        "performanceValue": 10959.3911
    },
    {
        "date": "17/07/2023",
        "navValue": 10629.3489,
        "performanceValue": 10898.6981
    },
    {
        "date": "18/07/2023",
        "navValue": 10587.6937,
        "performanceValue": 10847.1472
    },
    {
        "date": "19/07/2023",
        "navValue": 10567.3597,
        "performanceValue": 10828.1332
    },
    {
        "date": "20/07/2023",
        "navValue": 10693.4906,
        "performanceValue": 10977.8098
    },
    {
        "date": "21/07/2023",
        "navValue": 10743.6011,
        "performanceValue": 11019.7192
    },
    {
        "date": "24/07/2023",
        "navValue": 10747.0934,
        "performanceValue": 11045.5283
    },
    {
        "date": "25/07/2023",
        "navValue": 10766.2911,
        "performanceValue": 11079.3331
    },
    {
        "date": "26/07/2023",
        "navValue": 10865.0168,
        "performanceValue": 11150.6995
    },
    {
        "date": "27/07/2023",
        "navValue": 10970.9076,
        "performanceValue": 11257.9544
    },
    {
        "date": "28/07/2023",
        "navValue": 10970.6822,
        "performanceValue": 11257.9544
    },
    {
        "date": "31/07/2023",
        "navValue": 11221.539,
        "performanceValue": 11514.0374
    },
    {
        "date": "01/08/2023",
        "navValue": 11285.3095,
        "performanceValue": 11541.7413
    },
    {
        "date": "02/08/2023",
        "navValue": 11429.0584,
        "performanceValue": 11715.7658
    },
    {
        "date": "03/08/2023",
        "navValue": 11414.7449,
        "performanceValue": 11668.1305
    },
    {
        "date": "04/08/2023",
        "navValue": 11402.7116,
        "performanceValue": 11693.4859
    },
    {
        "date": "07/08/2023",
        "navValue": 11359.7318,
        "performanceValue": 11623.4276
    },
    {
        "date": "08/08/2023",
        "navValue": 11075.289,
        "performanceValue": 11365.3797
    },
    {
        "date": "09/08/2023",
        "navValue": 11291.1823,
        "performanceValue": 11687.156
    },
    {
        "date": "10/08/2023",
        "navValue": 11142.6116,
        "performanceValue": 11544.3159
    },
    {
        "date": "11/08/2023",
        "navValue": 11297.6538,
        "performanceValue": 11657.2624
    },
    {
        "date": "14/08/2023",
        "navValue": 11297.4217,
        "performanceValue": 11657.2624
    },
    {
        "date": "15/08/2023",
        "navValue": 11363.9381,
        "performanceValue": 11696.3052
    },
    {
        "date": "16/08/2023",
        "navValue": 11259.5393,
        "performanceValue": 11591.6292
    },
    {
        "date": "17/08/2023",
        "navValue": 11308.1592,
        "performanceValue": 11656.5254
    },
    {
        "date": "18/08/2023",
        "navValue": 11284.4004,
        "performanceValue": 11610.2711
    },
    {
        "date": "21/08/2023",
        "navValue": 11132.6063,
        "performanceValue": 11459.046
    },
    {
        "date": "22/08/2023",
        "navValue": 11147.9176,
        "performanceValue": 11492.5904
    },
    {
        "date": "23/08/2023",
        "navValue": 11148.7057,
        "performanceValue": 11493.0569
    },
    {
        "date": "24/08/2023",
        "navValue": 11235.4929,
        "performanceValue": 11543.6475
    },
    {
        "date": "25/08/2023",
        "navValue": 11227.4214,
        "performanceValue": 11521.953
    },
    {
        "date": "28/08/2023",
        "navValue": 11118.9454,
        "performanceValue": 11436.1121
    },
    {
        "date": "29/08/2023",
        "navValue": 10866.072,
        "performanceValue": 11164.9221
    },
    {
        "date": "30/08/2023",
        "navValue": 10709.2463,
        "performanceValue": 10985.1287
    },
    {
        "date": "31/08/2023",
        "navValue": 10425.3114,
        "performanceValue": 10750.5471
    },
    {
        "date": "01/09/2023",
        "navValue": 10489.657,
        "performanceValue": 10790.1995
    },
    {
        "date": "04/09/2023",
        "navValue": 10624.3905,
        "performanceValue": 10925.3087
    },
    {
        "date": "05/09/2023",
        "navValue": 10571.4144,
        "performanceValue": 10852.2249
    },
    {
        "date": "06/09/2023",
        "navValue": 10629.671,
        "performanceValue": 10940.0837
    },
    {
        "date": "07/09/2023",
        "navValue": 10627.7323,
        "performanceValue": 10945.2229
    },
    {
        "date": "08/09/2023",
        "navValue": 10701.9041,
        "performanceValue": 11052.0757
    },
    {
        "date": "11/09/2023",
        "navValue": 10673.9706,
        "performanceValue": 11031.4945
    },
    {
        "date": "12/09/2023",
        "navValue": 10589.8396,
        "performanceValue": 10918.714
    },
    {
        "date": "13/09/2023",
        "navValue": 10637.029,
        "performanceValue": 10996.4919
    },
    {
        "date": "14/09/2023",
        "navValue": 10646.7248,
        "performanceValue": 11017.6054
    },
    {
        "date": "15/09/2023",
        "navValue": 10735.3598,
        "performanceValue": 11088.6383
    }
]

function getFundData2(duration) {
    const params = typeof duration == 'object' || duration == undefined ? 3 : duration;
    const url = `${mahaanaWealthCashFund}/api/CashFund/fundperformance?duration=${params}`;
    fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
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
            renderFundChart(demoPerformaceData);
            const lastDate = demoPerformaceData[demoPerformaceData.length - 1].date;
            if (totalReturnDate) {
                totalReturnDate.textContent = `as of ${moment(lastDate, 'DD/MM/YYYY').format('D MMM YYYY')}`;
            }
        }
        ).catch((error) => {
            console.error('Error occurred:', error)
        })
}
getFundData2();

fetchData();


// BODY
var currentUrl = window.location.href; var updatedUrl = currentUrl.replace(/[?&]section=[^&]+/, ''); if (currentUrl !== updatedUrl) { window.history.replaceState(null, null, updatedUrl); }; $(document).ready(function () { $('.tab-item').click(function (event) { event.stopPropagation(); }); $("html, body").animate({ scrollTop: 0 }, "slow"); $(window).on('load', function () { $(".tab-item").removeClass("w--current", "active") }); }); document.addEventListener("DOMContentLoaded", function () { tabStopHandler(); tabHandler(); }); document.addEventListener("scroll", scrollHandler);

function getFormattedDate(date) { const navDate = moment(date, "DDMMYYYY").format('DD MMM YYYY'); return "as of " + navDate };

function displayReports(reportsData) {
    const startIndex = (currentPage - 1) * itemsPerPage; const endIndex = startIndex + itemsPerPage; const displayedData = reportsData?.slice(startIndex, endIndex) || [];
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

function goToPage(page) { if (page >= 1 && page <= Math.ceil((reportsData.length || 0) / itemsPerPage)) { currentPage = page; window.currentPage = displayReports(reportsData) } }
const graphDur = [{ key: '1M', value: 0 }, { key: '3M', value: 3 }, { key: '1Y', value: 12 }, { key: '3Y', value: 12 }];
const durationContainerNew = document.getElementById('new-graph-duration'); if (durationContainerNew) { while (durationContainerNew.firstChild) { durationContainerNew.removeChild(durationContainerNew.firstChild); } graphDur.forEach(item => { const durationDiv = document.createElement('div'); durationDiv.className = 'duration'; durationDiv.textContent = item.key; if (item.key === '3M') { durationDiv.classList.add('selected') } durationDiv.addEventListener('click', () => { const selectedDiv = document.querySelector('.duration.selected'); if (selectedDiv) { selectedDiv.classList.remove('selected') } durationDiv.classList.add('selected'); getFundData2(item.value); }); if (durationContainerNew) { durationContainerNew.appendChild(durationDiv); } }); const svgDiv = document.createElement('div'); svgDiv.className = 'html-embed-50 w-embed'; svgDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M4.75 0.75C4.75 0.334375 4.41563 0 4 0C3.58437 0 3.25 0.334375 3.25 0.75V2H2C0.896875 2 0 2.89687 0 4V4.5V6V14C0 15.1031 0.896875 16 2 16H12C13.1031 16 14 15.1031 14 14V6V4.5V4C14 2.89687 13.1031 2 12 2H10.75V0.75C10.75 0.334375 10.4156 0 10 0C9.58438 0 9.25 0.334375 9.25 0.75V2H4.75V0.75ZM1.5 6H12.5V14C12.5 14.275 12.275 14.5 12 14.5H2C1.725 14.5 1.5 14.275 1.5 14V6ZM3 8.75C3 9.16562 3.33437 9.5 3.75 9.5H10.25C10.6656 9.5 11 9.16562 11 8.75C11 8.33438 10.6656 8 10.25 8H3.75C3.33437 8 3 8.33438 3 8.75ZM3.75 11C3.33437 11 3 11.3344 3 11.75C3 12.1656 3.33437 12.5 3.75 12.5H7.25C7.66563 12.5 8 12.1656 8 11.75C8 11.3344 7.66563 11 7.25 11H3.75Z" fill="#667085"></path></svg>`; durationContainerNew.appendChild(svgDiv); }


// ---------------------------------------------- //
