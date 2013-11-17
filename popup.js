
// Get the user's CoinBase balance
xmlResponse = httpGet("https://coinbase.com/api/v1/account/balance?api_key="+localStorage['api_key']);
var parsedObject = JSON.parse(xmlResponse)
coinbaseBalance = parseFloat(parsedObject.amount);
//coinbaseBalance = 100.56;

// Convert bitcoin balance to USD
xmlResponse = httpGet("https://coinbase.com/api/v1/currencies/exchange_rates");
var parsedObject = JSON.parse(xmlResponse)
coinbaseBalanceConverted = parseFloat(parsedObject.btc_to_usd * coinbaseBalance).toFixed(2);

USD_TO_BITCOIN = parseFloat(parsedObject.usd_to_btc);

// get the item's price
itemPrice = 0;
chrome.tabs.getSelected(getItemPrice);

function getItemPrice(tab)
{
	var noQueryVars = tab.url.substr(1, tab.url.indexOf("?"));
	var itemid = noQueryVars.substring(noQueryVars.lastIndexOf("/")+1, noQueryVars.length-1);
	
	xmlResponse = httpGet(createItemXMLRequest(itemid));
	var priceString = "&Item(0).ConvertedCurrentPrice.Value=";
	var holdString = xmlResponse.substr(xmlResponse.indexOf(priceString)+priceString.length);
	
	holdString = holdString.substr(0, holdString.indexOf("&"));
	
	itemPrice = parseFloat(holdString);
	

	// check to see if user can afford the item
	canAfford = (coinbaseBalanceConverted >= itemPrice)
	var theDiv = document.getElementById("outputField");
	if(canAfford)
	{
		theDiv.innerHTML = "<b>You can buy this!</b><br><br>This item costs <b>$" + itemPrice + "</b> and you have <b>$" + coinbaseBalanceConverted + "</b><br><br>Are you sure you want to make this purchase?<br><br>";
	}
	else
	{
		theDiv.innerHTML = "<b>You can't afford this!</b><br><br>This item costs <b>$" + itemPrice + "</b> and you have <b>$" + coinbaseBalanceConverted + "</b><br><br>";
		btnConfirm.disabled = true;
	}
}


document.getElementById('btnConfirm').onclick=function()
{
	//Confirm
	var confirmed = confirm("Are you sure you want to make this purchase?");
	if(!confirmed)
	{
		return;
	}
	
	// Send an HTTP request to Coinbase to convert bitcoins to currency
	var parameters = new Object();
	parameters.qty = USD_TO_BITCOIN * itemPrice;
	
	post_to_url("https://coinbase.com/api/v1/sells", parameters, "post");
	
	alert("Money transferred to your bank account");
	
};

function createItemXMLRequest(itemid)
{
	return 'http://open.api.ebay.com/shopping?callname=GetItemStatus&appid=TommySte-070e-4381-9e91-d588b183dc40&version=517&siteid=0&responseencoding=NV&itemid=' + itemid;
}

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }
	
    form.submit();
}

