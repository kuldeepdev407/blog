---
title: 'How to add vertical tab in firefox'
description: 'A short guide to add Vertical tab in Firefox'
published: true
published_at: '2024-03-25 10:23 +0000'
author:
  - kuldeep_singh
tags:
  - firefox
cover_image: 'https://images.unsplash.com/photo-1668854040739-c5958f25f8f8?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1080'
read_time: 5
---

![firefox-vertical-tab-demo.gif](/images/firefox-vertical-tab-demo.gif)

I have been using Mozilla Firebox for my entire life. I know most of the people use chrome. It just completes all my needs. Recently i started using Microsoft Edge as i need to  separate my personal searches 😅 with other work searches. While using Microsoft Edge I really liked Vertical Tab Feature. It made managing tabs more easy for me. I searched for vertical tabs option in Firefox. After reading some reddit post i found that only way is to add this is via extensions. Previously Firefox has vertical tabs option but they removed it.

## Vertical Tab
So after some search i found out extension [Tree Style Tab](https://addons.mozilla.org/en-US/firefox/addon/tree-style-tab/) .This extension is developed by a Japanese developer [Piroor](https://github.com/piroor) and still maintained by him. He also had manga for Linux system admin but they are all in Japanese i was unable to read it. If you install this extension the think is it does not have is automatic tab hiding feature like Edge built-in so for that we have to do some configuration. Also tabs on the top are still visible after installing this extension.  

## Remove Top Tabs
![firefox-top-tabs](/images/firefox-top-tabs.webp)

To remove top tabs you first go to `Menu -> Help -> More Troubleshooting Information` or navigate to `about:support` in address bar. Their will be a section called `ProfileFolder` under `Application Basics` with button `Open Directory`. After clicking that create a Folder `chrome` in that chrome folder create `useChrome.css` or edit it if it already exist. 
```css
#titlebar {
  visibility: collapse;
}
```

> After Saving File open `about:config`  in Firefox and change `toolkit.legacyUserProfileCustomizations.stylesheets` value to `true`

Then Relaunch Firefox after saving useChrome.css file.
Note that Google Chrome browser has nothing to with chrome & useChome.css folder & file😁

![firefox-top-tabs-removed](/images/firefox-top-tabs-removed.webp)

After Launch we have our top tabs removed now we need make our vertical tab hide automatically for that we are going to use some CSS again. 

![very-imp-point-img.png](/images/very-imp-point-img.webp)

Note that after removing top tabs on window we don't have minimize, maximize, close button visible. So use their respective use keyboard shortcuts.
## Automatically Hiding Vertical Tab
To Hide Vertical tab you need to to update you useChrome.css to below one. 
```css
/* hides the title bar */
#titlebar {
  visibility: collapse;
}

:root {
  --thin-tab-width: 30px;
  --wide-tab-width: 300px;
  --inactive-tab-hide-delay: 180s;
  /* This value should be updated here and in the tree-style-tabs-theme.css */
  --tst-sidepanel-hide-delay: 0.1s;
}

/* where active tab is pinned, delays hiding of 'last-active' inactive tab for 1hr */
.tabbrowser-tab[pinned][selected] ~ .tabbrowser-tab[fadein]:not([pinned]) {
  transition-duration: 0s !important;
  transition-property: width, visibility, min-width, -moz-box-flex !important;
  transition-delay: 3600s !important; /* = 1hr, adjust seconds to increase / decrease visibility */
}

/* hides all non-active tabs */
.tabbrowser-tab[fadein]:not([pinned]):not([selected]):not([customizing]):not([tabdrop-samewindow][style*="translate"]) {
  visibility: hidden;
  overflow: hidden;
  min-width: 0 !important;
  -moz-box-flex: 0 !important;
  flex-grow: unset !important; /* required since v113 */
  padding: 0 !important;
}

/* waits 60 seconds before hiding inactive tabs */
.tabbrowser-tab[fadein]:not([pinned]):not([customizing]):not([tabdrop-samewindow][style*="translate"]) {
  min-width: 0 !important;
  transition-property: min-width, max-width, width, visibility !important;
  transition-duration: 0.4s !important; /* slide shut */
  transition-delay: var(--inactive-tab-hide-delay) !important; /* wait X seconds before hiding inactive tabs | 0 = immediate */
}

/* shows active tabs immediately */
.tabbrowser-tab[fadein][selected]:not([pinned]):not([customizing]):not([tabdrop-samewindow][style*="translate"]) {
  min-width: var(--tab-min-width) !important;
  width: var(--tab-min-width) !important;
  transition-duration: 0s !important; /* = immediate */
  transition-delay: 0s !important; /* = immediate */
}
/* Sidebar sliding auto-reveal */

/* Sidebar min and max width removal */
#sidebar {
  max-width: none !important;
  min-width: 0px !important;
}

/* Hide splitter */
#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"] + #sidebar-splitter {
  display: none !important;
}
/* Hide sidebar header */
#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"] #sidebar-header {
  visibility: collapse;
}

/* Shrink sidebar until hovered */
#sidebar-box:not([sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"]) {
  min-width: var(--wide-tab-width) !important;
  max-width: none !important;
}
#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"] {
  overflow: hidden !important;
  position: relative !important;
  transition: all 0.2s var(--tst-sidepanel-hide-delay) !important;
  min-width: var(--thin-tab-width) !important;
  max-width: var(--thin-tab-width) !important;
  z-index: 2;
}
#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"]:hover,
#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"] #sidebar {
  transition-delay: 0s !important;
  min-width: var(--wide-tab-width) !important;
  max-width: var(--wide-tab-width) !important;
  z-index: 1;
}
#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"]:hover {
  margin-right: calc((var(--wide-tab-width) - var(--thin-tab-width)) * -1) !important;
}
```

After updating still the alignment of the are not good for that you need to do some configuration.

![Not aligned Vertical Tab](/images/firefox-not-aligned-vertical-tabs.webp)

Go  to `about:addons` in Firefox . Then open Tree Style Tree Options scroll down a bit until you find  `Use Style Sheet (extra style rules for contents...)`

![Config Image](/images/tst-css-config.webp)

Paste below code in it 
```css

:root {
  /* This value should be updated here and in the userChrome.css */
  --tst-sidepanel-hide-delay: 0.1s;
}

/* Hide border on tab bar, force its state to 'scroll', adjust margin-left for width of scrollbar. */
#tabbar {
  border: 0;
  scrollbar-width: none;
  overflow: scroll !important;
  margin-top:  0 !important;
}

/* resolve extra space for scrollbar (scrollbar is hidden by this script) */
.on-scrollbar-area #tabbar {
  --shift-tabs-for-scrollbar-distance: 0px;
}

/* Include 'reveal' animation ... stagers by level */
#tabbar .tab {
  transition: 0.1s margin-top, 0.2s 0.1s visibility;
}
#tabbar tab-item-substance {
  transition: 0.2s 0.1s margin-left;
}


/* delay transitions on open */
#tabbar:not(:hover) tab-item-substance {
  transition-delay: var(--tst-sidepanel-hide-delay);
  margin-left: 0;
}

/* animate twisty reveal */
#tabbar .tab .twisty {
  transition: 0.2s margin;
}

/* general tabs */
.tab {
  background-color: transparent;
}
.tab,
.tab.pinned {
  height: 2.8em;
}

/* Push tab labels slightly to the right so they're completely hidden in collapsed state, but still look fine while expanded. */
.tab .label {
  margin-left: 1em;
}

/* fix closebox */
.tab .closebox {
  margin-left:  0;
}

.tab .counter {
  margin-left:  auto;
  display: inline-block !important;
}

/* Hide .twisty and adjust margins so favicons have 7px on left. */
#tabbar:not(:hover) .tab .twisty {
  visibility: hidden;
  margin-left: -12px;
  transition-delay: var(--tst-sidepanel-hide-delay);
}


/* hide closebox unless needed
.tab:not(:hover) .closebox {
  visibility: hidden;
}*/

/* Hide sound playing/muted button. */
.sound-button {
  margin-left: 0;
  display: inline-block;
  visibility: collapse;
}

.tab.audible .sound-button {
  visibility: visible;
  margin-left: 0.25em;
}

.tab:not([data-child-ids]) .counter {
  /* visibility: hidden; */
}

tab-item:not(.subtree-collapsed) .counter {
  visibility: hidden;
} 

/* Hide 'new tab' button. 
.newtab-button {
  display: none;
}*/

/* active tab */
.tab.active {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

tab-item.active .highlighter::before {
  background-color: #fffd !important;
}

.tab:hover,
.tab.active:hover {
  background-color: inherit;
}
.tab.active .label {
  font-weight: bold;
  color: #000 !important;
}
.tab .label,
.tab.active .label {
  border-bottom:  1px solid transparent;
}
.tab:hover .label,
.tab.active:hover .label {
  border-bottom:  1px dotted;
  min-width:  0 !important;
  flex-shrink:  1 !important;
  flex-grow:  unset !important;
}

/* pending / unloaded tabs */
.tab.discarded {
  background-color: #1d1d1d;
}
.tab.discarded .label {
  color: #efefefCC !important;
}
.tab.discarded:hover .label {
  color: #efefef !important;
}

/* Adjust style for tab that has sound playing. */
.tab.sound-playing .favicon::after,
.tab.muted .favicon::after {
  content: '🔊';
  z-index: var(--favicon-base-z-index);
  position: absolute;
  font-size: 0.5em;
  bottom: -0.35em;
  right: -0.7em;
}

/* Adjust style for tab that is muted. */
.tab.muted .favicon::after {
  content: '🔇';
}

/* Pinned tabs: */
/* Hide all non-active pinned tabs (these are included in top-bar instead) */
.tab.pinned {
  position: relative;
  max-width: none;
  width: auto;
  top: 0 !important;
  left: 0 !important;
}
.tab.pinned:not(.active) {
  display: none;
}
.tab.pinned .label,
.tab.pinned .label-content {
  opacity: 1;
  position: unset;
  padding-bottom: 0;
}
.tab.pinned .sound-button {
  position: relative;
  transform: none;
}
.tab.pinned .twisty {
  display: block;
  min-width: none;
  width: auto;
}
```

> 🎉CONGRATULATION you have vertical tabs in your Firefox🎉

 Below are some of the references: 
https://superuser.com/questions/1424478/can-i-hide-native-tabs-at-the-top-of-firefox
https://gist.github.com/theprojectsomething/6813b2c27611be03e67c78d936b0f760
