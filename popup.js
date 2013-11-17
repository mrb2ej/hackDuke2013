
// Get the user's CoinBase balance
//xmlResponse = httpGet("https://coinbase.com/api/v1/account/balance?api_key="+localStorage['api_key']);
//var parsedObject = JSON.parse(xmlResponse)
//coinbaseBalance = parseFloat(parsedObject.amount);
coinbaseBalance = 2.56;

// Convert bitcoin balance to USD
xmlResponse = httpGet("https://coinbase.com/api/v1/currencies/exchange_rates");
var parsedObject = JSON.parse(xmlResponse)
coinbaseBalanceConverted = parseFloat(parsedObject.btc_to_usd * coinbaseBalance).toFixed(2);

// get the item's price
itemPrice = 0;
chrome.tabs.getSelected(getItemPrice);

function getItemPrice(tab)
{
	var queryVars = tab.url.substr(tab.url.indexOf("?"));
	var itemid = queryVars.substr(queryVars.indexOf("hash=") + 9);
	alert(itemid);
	xmlResponse = httpGet(createItemXMLRequest(itemid));
	var parsedObject = JSON.parse(xmlResponse);
	alert(parsedObject);
	
	// check to see if user can afford the item
	canAfford = (coinbaseBalanceConverted >= itemPrice)
}


document.getElementById('btnConfirm').onclick=function()
{
	alert("You are a baller shot caller");
	
	// Get the item's price
	itemPrice = 0;
	
	// Send an HTTP request to Coinbase to convert bitcoins to currency
	
	
	//? Send an HTTP request to Ebay to purchase the item
};
//document.getElementById('btnCancel').onclick=function(){alert("Purchase cancelled");};
//<input type="button" id="btnCancel" value="Cancel Purchase" />

function createItemXMLRequest(itemid)
{
	return 'http://open.api.ebay.com/shopping';
}

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

