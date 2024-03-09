## EU API
- XML format


### EU API to retrieve legal publications:
Example steps:
1. Grab a summary page as example:
https://eur-lex.europa.eu/EN/legal-content/summary/protecting-health-and-the-environment-from-persistent-organic-pollutants.html?fromSummary=03

2. The beginning of this page, it indicates it's a summary of https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32019R1021

3. In this url, https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32019R1021, track down the celex number is 3A32019R1021

4. Plugin the celex number into the following curl command to generate identifier number: 

```
curl -H 'Accept:application/xml;notice=identifiers' http://publications.europa.eu/resource/celex/32013R1305 -L

```
<IDENTIFIER>c973adc4-6c03-11e3-9afb-01aa75ed71a1</IDENTIFIER>

5. Use the identifier number to generate publication data.
```
curl -H 'Accept:application/xhtml+xml' -H 'Accept-Language:en' http://publications.europa.eu/resource/cellar/c973adc4-6c03-11e3-9afb-01aa75ed71a1 -L
```
### Useful references:
- EU summaries: https://eur-lex.europa.eu/browse/summaries.html
- What's cellar: https://op.europa.eu/en/web/cellar
- API examples: https://op.europa.eu/en/web/cellar/cellar-data/publications