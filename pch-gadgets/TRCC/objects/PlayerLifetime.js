//
// This file contains methods for parsing & rendering of the lifetime stats for individual players
//

function GGTRCC_PlayerLifetime_GetXMLURLFromName (aFirstName, aSurname)
{
	var lXMLURL=gGGGadget_Root + "TRCC/data/players/";
	
	var lFilename = aSurname + "_" + aFirstName + ".xml";
	
	lXMLURL += lFilename.toLowerCase();
	
	return (lXMLURL);
}


function GGTRCC_PlayerLifetime_GetXMLURLFromLocation()
{
	var lXMLURL=gGGGadget_Root + "TRCC/data/players/";
	
	lXMLURL += "(0) " + GGTRCC_ItemFromSitesURL (0) +
				" (1) " + GGTRCC_ItemFromSitesURL (1);
	
	return (lXMLURL);
}
