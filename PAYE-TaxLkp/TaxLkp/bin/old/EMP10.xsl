<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html"/>
<xsl:template match="/">
<HTML>
<HEAD>
<TITLE><xsl:value-of select="//summary/heading"/></TITLE>
</HEAD>
<BODY>
</BODY>
</HTML>

<!--Part 2-->
<table>


<tr>
<th>Annual Equivelant</th>
<th>Mth Income From</th>
<th>Mth Income To</th>
<th>Tax Normal</th>
<th>Tax Over 60</th>
</tr>

<xsl:for-each select="//XTaxItem">

<tr>
<th><xsl:value-of select="format-number(AnnulaEquiv,'R ###,000.00')"/></th>
<td><xsl:value-of select="format-number(MthIncomeFrom,'R ###,000.00')"/></td>
<td><xsl:value-of select="format-number(MthIncomeTo,'R ###,000.00')"/></td>
<td><xsl:value-of select="format-number(TaxNormal,'R ###,000.00')"/></td>
<td><xsl:value-of select="format-number(TaxOver65,'R ###,000.00')"/></td>
</tr>

</xsl:for-each>

</table>

</xsl:template>
</xsl:stylesheet>

