chrome.runtime.onInstalled.addListener( ()=>{
    chrome.action.setBadgeBackgroundColor( {color:[100,0,0,255]} )
    chrome.action.setBadgeTextColor( {color:[0,0,0,255]} )
})

chrome.action.onClicked.addListener( async tab=>
    (await chrome.action.getBadgeBackgroundColor(
        {tabId: tab.id}
    )).at() == 100 ?
    
    chrome.windows.create({
        url:'https://google.com',
        type:'popup',

        left:0,
        top:7,
        
        width:900,
        height:Math.round(1600/2-7)
    },w=>{
        id = Array(6).fill([...`${w.id}`.padStart(12,0)])
            .map( (a,i) => +(a[2*i] + a[2*i+1]) )
        chrome.action.setBadgeBackgroundColor({
            tabId: tab.id,
            color: [...id.slice(0,3), 255]
        })
        chrome.action.setBadgeTextColor({
            tabId: tab.id,
            color: [...id.slice(3,6), 255]
        })
    }) :

    chrome.windows.remove(
        +[
            ...(await chrome.action.getBadgeBackgroundColor( { tabId: tab.id } )).slice(0,3),
            ...(await chrome.action.getBadgeTextColor( { tabId: tab.id } )).slice(0,3)
        ].map(pair=>[...`${pair}`.padStart(2,0)]).flat().join(''),
        ()=>{
            chrome.action.setBadgeBackgroundColor({
                tabId: tab.id,
                color: [100,0,0,255]
            })
            chrome.action.setBadgeTextColor({
                tabId: tab.id,
                color: [0,0,0,255]
            })
        }
    )
)
