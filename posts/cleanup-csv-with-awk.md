---
title: 'Cleaning up .csv files with awk'
description: 'Super quick, super easy!'
date: '2017-08-01'
---

# Reformatting a .csv with awk

So I received a request to reformat a large csv file with about 100,000 lines, removing all rows that had no value entered in one of the fields. I had been producing the report using a PHP script and while I could have gone back in to refactor the code and check for an empty value, I thought I'd take an alternative approach to utilize some other tools. I decided to use the Unix awk utility to execute a one-liner after the report was created to elimiate the unecessary lines in the file. There was an extra challenge with the file since it was tab delimited so I had to add some additional arguments to account for this.

Here's the command, which removes any records in the file which have an empty field in the 12th column.

```bash
awk -F"\t" '$12!=""' input.csv > output.csv

```

`-F"\t"` processes the file as tab delimited.

`'$12!=""'` finds lines where the 12th column is not blank and `input.csv > output.csv` takes in the input file and redirects to an output file (awk will print the output by default).

That's it! In no time the file is cleaned of all records with empty values in the 12th column.
