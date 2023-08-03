/**
 * Copyright (c) 2021-
 * Utility functions for Google Chrome browser extension.
 */

export function getStorageData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      return resolve(result);
    });
  });
}

export function setStorageData(data) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(data, () => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      return resolve();
    });
  });
}

export function getStorageItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      return resolve(result[key]);
    });
  });
}

export function getStorageItems(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      return resolve(result);
    });
  });
}

export function setStorageItem(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      return resolve();
    });
  });
}

export async function removeStorageItem(key) {
  await chrome.storage.local.remove([key]);
}

export async function initializeStorageWithDefaults(defaults) {
  const currentStorageData = await getStorageData();
  const newStorageData = Object.assign({}, defaults, currentStorageData);
  await setStorageData(newStorageData);
}

export async function tabExists(tabId) {
  try {
    await chrome.tabs.get(tabId);
    return true;
  } catch (e) {
    return false;
  }
}

export async function defaultMessageHandler(request, sender, sendResponse) {
  switch (request.cmd) {
    case 'sendTo':
      chrome.tabs.sendMessage(Number(request.to), { ...request.request });
      return true;
    case 'broadcast':
      chrome.tabs.query({}, (tabs) =>
        tabs.forEach((tab) => {
          console.log('tab', tab);
          chrome.tabs.sendMessage(tab.id, { ...request.request });
        })
      );
      return true;
    case 'openTab':
      openTab(request);
      return true;
    case 'openFocusedTab':
      openTab({ ...request, active: true });
      return true;
    case 'openInSameTab':
      openInSameTab(request);
      return true;
    case 'openInSameishTab':
      openInSameishTab(request, sender);
      return true;
    case 'closeTabs':
      for (const tabId of request.tabIds) {
        await removeTab(tabId);
      }
      return true;
    case 'closeOtherTabs':
      closeOtherTabs(sender);
      return true;
    case 'closeOtherNormalTabs':
      closeOtherNormalTabs(sender);
      return true;
    case 'closeMyOpenedTabs':
      closeMyOpenedTabs(sender.tab.id);
      return true;
    case 'closeNewerNormalTabs':
      closeNewerNormalTabs(sender);
      return true;
    case 'closeMySelf':
      closeMySelf(sender);
      return true;
    case 'closeTabsButOne':
      closeTabsButOne(sender.tab.id, request.url);
      return true;
    case 'closeTabsButOneMinimizeWindow':
      closeTabsButOneMinimizeWindow(sender.tab.id, request.url);
      return true;
    case 'minimize':
      minimizeCurrentWindow();
      return true;
    case 'minimizeWindow':
      minimizeCurrentWindow();
      return true;
    case 'closeWindow':
      closeWindow();
      return true;
    case 'focusMyTab':
      focusMyTab(sender);
      return true;
    case 'unfocusMyTab':
      unfocusMyTab(sender);
      return true;
    case 'getMyTabId':
      getMyTabId(sender, sendResponse);
      return true;
    case 'openOptionsPage':
      openOptionsPage();
      return true;
    default:
      console.log('No hit in default messageHandler!');
      return false;
  }
}

// PENDING REQUEST -------------------------------------------------------------------

export async function addPendingRequest(url, data = {}) {
  // console.log('addPendingRequest', url, data);
  const key = normalizePendingLink(url);
  const obj = {};
  obj[key] = { ...data, created: Number(new Date()), isPendingRequest: true };
  await chrome.storage.local.set(obj);
}

export async function dispatch(url, lifetimeSecs = null) {
  // console.log('dispatch url', url, lifetimeSecs);
  const key = normalizePendingLink(url);
  const container = await chrome.storage.local.get(key);
  let request = container ? container[key] : null;
  // console.log('dispatch request, container:', request, container);
  if (request) {
    if (lifetimeSecs) {
      const whenDead = new Date(request.created + lifetimeSecs * 1000);
      const dateNow = new Date();
      if (dateNow > whenDead) {
        request = null;
      }
      await cleanupPendingRequests(lifetimeSecs);
    }
    await chrome.storage.local.remove([key]);
  }
  return request;
}

export function normalizePendingLink(url) {
  // Remove http(s) from link to avoid redirects to https not matching with original http request in pending requests!
  const hashIndex = url.indexOf('#');
  const removedHashUrl = url.substr(0, hashIndex > 0 ? hashIndex : url.length);
  return removedHashUrl
    .replace(/https?:\/\//i, '')
    .replace('www.discord.gg/', '')
    .replace('www.discord.com/invite/', '')
    .replace('discord.gg/', '')
    .replace('discord.com/invite/', '');
}

async function cleanupPendingRequests(lifetimeSecs) {
  // console.log('cleanupPendingRequests:', lifetimeSecs);
  const storage = await chrome.storage.local.get();
  for (let [key, value] of Object.entries(storage)) {
    // console.log(key, value);
    if (isOldPendingRequest(value, lifetimeSecs)) {
      // console.log('remove old key:', key);
      await chrome.storage.local.remove([key]);
    }
  }
}

function isOldPendingRequest(obj, lifetimeSecs) {
  // console.log('isOldPendingRequest:', obj, lifetimeSecs);
  if (!obj?.action) {
    return false;
  }
  if (obj.isPendingRequest) {
    return isOldPendingRequestChecker(obj, lifetimeSecs);
  }
  if (typeof obj.action === 'string' && obj.action.length > 0 && typeof obj.created === 'object' && Object.keys(obj.created).length === 0) {
    // Catch old bug when pending requests were saved without create date!
    return true;
  }
  if (typeof obj.created !== 'number') {
    return false;
  }
  return isOldPendingRequestChecker(obj, lifetimeSecs);
}

function isOldPendingRequestChecker(obj, lifetimeSecs) {
  const dateNow = Date.now();
  const dateWhenOld = obj.created + lifetimeSecs * 1000;
  //// console.log('dateNow, dateWhenOld', dateNow, dateWhenOld);
  if (dateNow > dateWhenOld) {
    return true;
  }
  return false;
}

// WORKER FUNCS -------------------------------------------------------------------

export async function removeTab(tabId) {
  console.log('removeTab, tabId:', tabId);
  try {
    if (!(await tabExists(tabId))) {
      console.log('Skip already closed tab:', tabId);
      return;
    }
    const tab = await chrome.tabs.get(parseInt(tabId));
    if (tab) {
      console.log('remove tab...', tab);
      chrome.tabs.remove(tabId, () => console.log(`close tab ${tabId}`));
    } else {
      console.log(`skip close tab ${tabId}`);
    }
  } catch (e) {
    console.log('removeTab error:', tabId, e.message);
  }
}

export async function getTabsToRight(sender) {
  console.log('getTabsToRight');
  chrome.tabs.query({}, (tabs) => {
    console.log('tabs:', tabs);
    const tabsResult = [];
    for (let tab of tabs) {
      if (tab.index > sender.tab.index) {
        console.log('tab is RIGHT:', tab);
        tabsResult.push(tab);
      } else {
        console.log('tab is left:', tab);
      }
    }
    console.log('tabsResult:', tabsResult);
    return tabsResult;
  });
}

function openTab(request) {
  chrome.tabs.create({ url: request.url, active: request.active ?? false });
}

function openInSameTab(request) {
  chrome.tabs.update(undefined, { url: request.url });
}

function openInSameishTab(request, sender) {
  console.log('sender.tab', sender.tab);
  if (sender.tab.url.startsWith('http')) {
    chrome.tabs.update(undefined, { url: request.url });
  } else {
    chrome.tabs.create({ url: request.url });
  }
}

function closeOtherTabs(sender) {
  closeOtherTabsGeneric(sender.tab, false, false);
}

function closeOtherNormalTabs(sender) {
  closeOtherTabsGeneric(sender.tab, false, true);
}

function closeNewerNormalTabs(sender) {
  closeOtherTabsGeneric(sender.tab, true, true);
}

function closeMySelf(sender) {
  chrome.tabs.remove(sender.tab.id, () => console.log('close tab'));
}

function focusMyTab(sender) {
  chrome.tabs.update(sender.tab.id, { highlighted: true });
}

function unfocusMyTab(sender) {
  unfocusMyTabId(sender.tab.id);
}

function unfocusMyTabId(tabId) {
  chrome.tabs.update(tabId, { highlighted: false, active: false });
}

function getMyTabId(sender, sendResponse) {
  console.log('getMyTabId, sender.tab:', sender.tab);
  sendResponse(sender.tab.id);
}

function openOptionsPage() {
  console.log('openOptionsPage');
  chrome.runtime.openOptionsPage();
}

function closeOtherTabsGeneric(myTab, onlyNewer = false, onlyNormal = true, exceptionTabIds = []) {
  console.log('closeOtherTabs; myTab, onlyNewer, onlyNormal, exceptionTabIds', myTab, onlyNewer, onlyNormal, exceptionTabIds);
  chrome.tabs.query({}, (tabs) => {
    console.log('tabs', tabs);
    tabs.forEach((tab) => {
      console.log('tab', tab);
      let shouldClose = false;
      if (onlyNewer) {
        shouldClose = tab.id > myTab.id && (onlyNormal ? tab.url.startsWith('http') : true);
      } else {
        shouldClose = tab.id !== myTab.id && (onlyNormal ? tab.url.startsWith('http') : true);
      }
      if (exceptionTabIds.includes(tab.id)) {
        shouldClose = false;
      }
      console.log('shouldClose:', shouldClose);
      if (shouldClose) {
        console.log('Close this tab:', tab);
        chrome.tabs.remove(tab.id, () => console.log('close tab'));
      }
    });
  });
}

function closeMyOpenedTabs(myTabId) {
  console.log('closeMyOpenedTabs; myTabId:', myTabId);
  chrome.tabs.query({}, (tabs) => {
    console.log('closeMyOpenedTabs tabs', tabs);
    tabs.forEach((tab) => {
      console.log('tab', tab);
      const shouldClose = tab.openerTabId && tab.openerTabId === myTabId;
      console.log('shouldClose:', shouldClose);
      if (shouldClose) {
        console.log('Close this tab:', tab);
        if (tab) {
          chrome.tabs.remove(tab.id, () => console.log('close tab'));
        }
      }
    });
  });
}

function closeTabsButOne(senderTabId, url) {
  const butOneTabUrl = url || 'chrome://version/';
  chrome.tabs.update(senderTabId, { url: butOneTabUrl });
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      console.log('tab', tab);
      if (senderTabId === tab.id) {
        return;
      }
      chrome.tabs.remove(tab.id, () => console.log(`Close tab: ${tab.url}`));
    });
  });
  return true;
}

function closeTabsButOneMinimizeWindow(senderTabId, url) {
  closeTabsButOne(senderTabId, url);
  minimizeCurrentWindow();
  return true;
}

function closeWindow() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.remove(tab.id, () => console.log(`Close tab: ${tab.url}`));
    });
  });
  return true;
}

function minimizeCurrentWindow() {
  chrome.windows.getCurrent((win) => {
    console.log(win);
    chrome.windows.update(win.id, { state: 'minimized' });
  });
}
