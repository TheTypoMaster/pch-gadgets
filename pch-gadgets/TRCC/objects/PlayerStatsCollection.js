//------------------------------------------------------------
// Object to hold a collection of GGTRCC_PlayerStatsO objects
//
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO ()
{
	this.mCollection = new Array;
	
	//
	// Cutoffs - How many innings/overs do you have to have 
	// before you count for the official "stats"
	//
	this.mBowlngOversCutoff	= 20;
	this.mBattingOutsCutoff	= 7;
	
	//
	// Methods
	//
	this.find				= GGTRCC_PlayerStatsCollectionO___find;
	this.updateTRCCBatting	= GGTRCC_PlayerStatsCollectionO___updateTRCCBatting
	this.updateTRCCBowling	= GGTRCC_PlayerStatsCollectionO___updateTRCCBowling
	this.updateTRCCCatches	= GGTRCC_PlayerStatsCollectionO___updateTRCCCatches
	
	this.getOrderedBattingStats	= GGTRCC_PlayerStatsCollectionO___getOrderedBattingStats;
	
	//
	// Creation of HTML
	//
	this.batsmanHTML		= GGTRCC_PlayerStatsCollectionO___batsmanHTML;

	//
	// Ordering functions
	// 	
	this.batterOrderFn		= GGTRCC_PlayerStatsCollectionO___batterOrderFn;
}


//------------------------------------------------------------
// Find the GGTRCC_PlayerStatsO object in the collection, or
// create a new one.
//
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO___find (aName)
{
	var lRet=null;
	
	for (var i=0 ; i<this.mCollection.length ; i++)
	{
		if (this.mCollection[i].mName == aName)
		{
			lRet = this.mCollection[i];
			break;
		}
	}
	
	if (null == lRet)
	{
		lRet = new GGTRCC_PlayerStatsO (aName);
		
		this.mCollection[this.mCollection.length] = lRet;
	}

	return (lRet);
}

function GGTRCC_PlayerStatsCollectionO___updateTRCCBatting (aBatsmanInningsO)
{
	this.find (aBatsmanInningsO.mName).mBatsmanSummary.update(aBatsmanInningsO);
}

function GGTRCC_PlayerStatsCollectionO___updateTRCCBowling (aBowlerSummaryO)
{
	
}

function GGTRCC_PlayerStatsCollectionO___updateTRCCCatches(aBowlerSummaryO)
{
	
}

function GGTRCC_PlayerStatsCollectionO___batsmanHTML()
{
	var lHTML="";
	
	//
	// Sort the play stats for by batting prowess
	//
	var lBatSum=this.getOrderedBattingStats(false);
	
	lHTML += "<span class='StatsHeading'>Batting</span>";
	
	lHTML += "<table width='100%' cellSpacing='0' cellPadding='0' border='0'>";
	lHTML += "	<thead>";
	lHTML += "	<tr class=\"BatsHeader\">";
	lHTML += "		<th>&nbsp;</th>";

	lHTML += "		<th align='left'>Name</th>";
	lHTML += "		<th align='right'>Games</th>";
	lHTML += "		<th align='right'>Innings</th>";
	lHTML += "		<th align='right'>Not Out</th>";
	lHTML += "		<th align='right'>Runs</th>";
	lHTML += "		<th align='right'>100s</th>";
	lHTML += "		<th align='right'>50s</th>";
	lHTML += "		<th align='right'>0s</th>";
	lHTML += "		<th align='right'>High</th>";
	lHTML += "		<th align='right'>Avg.</th>";

	lHTML += "		<th>&nbsp;</th>";
	lHTML += "	</tr>";
	lHTML += "	</thead>";
	lHTML += "	<tbody>";
	
	//
	// Getnerate the HTML
	//
	for (var i=0 ; i<lBatSum.length ; i++)
	{
		
		var lDefaultTRClass="FixtureAltLine";

		if (i % 2)
		{
			lDefaultTRClass = "FixtureNotAltLine";
		}

		lHTML += "<tr class='"							+ lDefaultTRClass	+ "' " +
				 "onmouseout=\"this.className='"		+ lDefaultTRClass	+ "'\" " + 
				 "onmouseover=\"this.className='"	+ "TableMouseOver"	+ "'\">";
		
		lHTML += lBatSum[i].batsmanHTML();
		
		lHTML += "</tr>";
	}
	
	lHTML += "	</tbody>";
	lHTML += "</table>";
	
	return (lHTML);
}


function GGTRCC_PlayerStatsCollectionO___batterOrderFn (aA, aB)
{
	var lRet = aB.mBatsmanSummary.getAverage() - aA.mBatsmanSummary.getAverage();

	if ((aA.mBatsmanSummary.getAverage() == 0) && (aB.mBatsmanSummary.getAverage() == 0))
	{
		var lAouts=aA.mBatsmanSummary.mInnings - aA.mBatsmanSummary.mNotOuts;
		var lBouts=aB.mBatsmanSummary.mInnings - aB.mBatsmanSummary.mNotOuts;

		lRet = lBouts - lAouts;

		if (lRet == 0)
		{
			lRet = aB.mBatsmanSummary.mRuns - aA.mBatsmanSummary.mRuns;
		}
	}

	return (lRet);
}


//------------------------------------------------------------
// Get batter stats ordered - either the true "stats", or 
// the "also batted"
//------------------------------------------------------------
function GGTRCC_PlayerStatsCollectionO___getOrderedBattingStats (aGetAlsoBatted)
{
	var lBS=new Array();

	for (var i=0 ; i<this.mCollection.length ; i++)
	{
		if (this.mCollection[i].mBatsmanSummary.mInnings > 0)
		{
			var lOuts=this.mCollection[i].mBatsmanSummary.mInnings - this.mCollection[i].mBatsmanSummary.mNotOuts;

			if (((lOuts >= this.mBattingOutsCutoff) && !aGetAlsoBatted)	||
				((lOuts <  this.mBattingOutsCutoff) && aGetAlsoBatted))
			{
				lBS[lBS.length] = this.mCollection[i];
			}

		}
	}

	lBS.sort (this.batterOrderFn);

	return (lBS);
}