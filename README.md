
This is a declined project of [anyTREX](https://github.com/tracking-exposed/anyTREX), feed by the analysis of [invi.sible.link](https://github.com/vecna/invi.sible.link).

Here the file of your concerns might be:

## last-list.csv

TODO write the editing policy

## index.html

TODO write the editing policy and the technical limit that might be fixed

## Updated notes

    for i in [ 'halal' 'mosques' 'travel' 'culture' ]; do DEBUG=* bin/directionTool.js --csv campaigns/amtrex/$i-list.csv --taskName $i; done
    for i in  'halal' 'mosques' 'travel' 'culture'; do echo $i; done


## Notes

    5652 ۞  ~/Dev/invi.sible.link DEBUG=*  bin/directionTool.js --csv ../amtrex/halal-list.csv --taskName halal && DEBUG=*  bin/directionTool.js --csv ../amtrex/culture-list.csv --taskName culture && DEBUG=*  bin/directionTool.js --csv ../amtrex/mosques-list.csv --taskName mosques && DEBUG=*  bin/directionTool.js --csv ../amtrex/travel-list.csv --taskName travel


    DEBUG=* bin/campaignChecker.js --config config/localC.json --campaign culture --taskName culture
    DEBUG=* bin/campaignChecker.js --config config/localC.json --campaign travel --taskName travel
    DEBUG=* bin/campaignChecker.js --config config/localC.json --campaign halal --taskName halal
    DEBUG=* bin/campaignChecker.js --config config/localC.json --campaign mosques --taskName mosques


    5791 ۞  ~/Dev/anyTREX DEBUG=* src="amtrex/halal-list.csv" dest=amtrex/halal-list.json ./gitcsv2list.js 
      anyTREX»gitcsv2json 10 lines → keys [site,description] 'rank' will be add +0ms
      anyTREX»gitcsv2json Writin amtrex/halal-list.json (JSON) with 8 entries +4ms
    5792 ۞  ~/Dev/anyTREX DEBUG=* src="amtrex/mosques-list.csv" dest=amtrex/mosques-list.json ./gitcsv2list.js 
      anyTREX»gitcsv2json 10 lines → keys [site,description] 'rank' will be add +0ms
      anyTREX»gitcsv2json Writin amtrex/mosques-list.json (JSON) with 9 entries +3ms
    5793 ۞  ~/Dev/anyTREX DEBUG=* src="amtrex/travel-list.csv" dest=amtrex/travel-list.json ./gitcsv2list.js 
      anyTREX»gitcsv2json 10 lines → keys [site,description] 'rank' will be add +0ms
      anyTREX»gitcsv2json Writin amtrex/travel-list.json (JSON) with 9 entries +3ms
    5794 ۞  ~/Dev/anyTREX DEBUG=* src="amtrex/culture-list.csv" dest=amtrex/culture-list.json ./gitcsv2list.js 
      anyTREX»gitcsv2json 75 lines → keys [site,description] 'rank' will be add +0ms
      anyTREX»gitcsv2json Writin amtrex/culture-list.json (JSON) with 74 entries +6ms
    5795 ۞  ~/Dev/anyTREX 


    DEBUG=* src=amtrex/culture-list.json dst=amtrex/culture campaign=culture ./jsonerate.js 
    DEBUG=* src=amtrex/halal-list.json dst=amtrex/halal campaign=halal ./jsonerate.js 
    DEBUG=* src=amtrex/travel-list.json dst=amtrex/travel campaign=travel ./jsonerate.js 
    DEBUG=* src=amtrex/mosques-list.json dst=amtrex/mosques campaign=mosques ./jsonerate.js 
