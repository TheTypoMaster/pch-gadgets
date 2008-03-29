
//-----------------------------------------[GGTRCC_TeamYearO]-
// Object to hold information on the teams that played in a 
// given year
//
// @param aYearXML 		IN 	The XML describing the teams that 
// 							 played in a single yeat
//
//------------------------------------------------------------
function GGTRCC_TeamYearO (aYearXML)
{
	//
	// Members
	//
	this.mYear = "";
	this.mSaturday = false;
	this.mSunday = false;

	//
	// Methods
	//
	this.year 			= GGTRCC_TeamYearO___year;
	this.haveSaturday 	= GGTRCC_TeamYearO___haveSaturday;
	this.haveSunday 	= GGTRCC_TeamYearO___haveSunday;
	this.saturdayHTML 	= GGTRCC_TeamYearO___saturdayHTML;
	this.sundayHTML 	= GGTRCC_TeamYearO___sundayHTML;
	this.teamHTML 		= GGTRCC_TeamYearO___teamHTML;

	//
	// Parse the XML
	//
	this.mYear = aYearXML.getAttribute ("year");
	
	var lTeams = aYearXML.childNodes;
	
	for (var j=0 ; j<lTeams.length ; ++j)
	{
		if (lTeams.item(j).nodeName == "Team")
		{
			if (lTeams.item(j).firstChild.nodeValue == "Saturday")
			{
				this.mSaturday = true;
			}
			else if (lTeams.item(j).firstChild.nodeValue == "Sunday")
			{
				this.mSunday = true;
			}
		}
	}
}

function GGTRCC_TeamYearO___year ()			{ return (this.mYear);		}
function GGTRCC_TeamYearO___haveSaturday()	{ return (this.mSaturday);	}
function GGTRCC_TeamYearO___haveSunday()	{ return (this.mSunday);	}


//------------------------------------------[GGTRCC_teamHTML]-
// Return the HTML & link for this team
//
//	@param	aExists		IN	Does this team have a result in this year?
//	@param	aTeamLabel	IN	The team name
//
// @return 	The HMTL 
//
//------------------------------------------------------------
function GGTRCC_TeamYearO___teamHTML (aExists, aTeamLabel)
{
	var lRet="&nbsp";
	
	if (aExists)
	{
		var lBaseURL="http://www.paulhackett.plus.com/websites/trcc/Fixtures/FixturesByYear.html";

		if (GGGadget_hostedOnSites())
		{
			lBaseURL = gGGGadget_SitesRoot + "FixturesForYear";
		}
		else if (GGGadget_hostedAtHome())
		{
			lBaseURL = gGGGadget_HomeRoot + "Fixtures/FixturesForYear";
		}	

		var lURL=lBaseURL + "?year=" + this.mYear + "+DOW=" + aTeamLabel;
		
		lRet = GGUtils_makeHREF (aTeamLabel, lURL);
	}
	
	return (lRet);
}

function GGTRCC_TeamYearO___saturdayHTML()	{ return (this.teamHTML (this.haveSaturday(), "Saturday"));	}
function GGTRCC_TeamYearO___sundayHTML()	{ return (this.teamHTML (this.haveSunday(), "Sunday"));		}


//
// The following are utility functions to help with the manipulation of TeamYears objects
//


//-----------------------------[GGTRCC_LoadTeamYearsFromXML]-
// Read the teams/years from the supplied XML and add then 
// to the end of the given array.
//
//	@param	aXML		IN	The XML to examine
//	@param	aOut		IN	The array of TeamYear objects 
// 							 we are to append to
//
// @return 	Number of TeamYears read in, or -1 upon error 
//
//------------------------------------------------------------
function GGTRCC_LoadTeamYearsFromXML (aXML, aOut)
{
	//
	// Validate the XML
	//
	if ((aXML == null) || (typeof(aXML) != "object") || (aXML.firstChild == null))
	{
		return (-1);
	}

	//
	// Down all the fixtures
	//
	var lYears = aXML.getElementsByTagName("TeamsInYear");
	
	for (var i=0 ; i<lYears.length ; ++i)
	{
		aOut[aOut.length] = new GGTRCC_TeamYearO (lYears.item(i));
	}
	
	return (lYears.length);
}