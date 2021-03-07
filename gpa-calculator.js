//Include jQuery library for AJAX GET request (lines 23-32)
var jquery = document.createElement('script');
jquery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(jquery);

var links = document.getElementsByTagName('a'); //Get array of all links on webpage
var courses = new Array();
var [actual, possible, points] = [{}, {}, {}]; /*Initialize dictionaries where the key-value pair is the course and an array of the following:
                                                 - 'actual' contains current course grade and equivalent GPA value
                                                 - 'possible' contains maximum possible course grade and equivalent GPA value
                                                 - 'points' contains earned and maxmimum course points*/
var gpaValues = [4.33, 4, 3.67, 3.33, 3, 2.67, 2.33, 2, 1.67, 1, 0];

/*Find courses based on matched substring in links and append to 'courses' array.
  Courses are always the 5-6 characters after 'CourseGradeBook.cfm?CourseNumber=' in links*/
for (i = 0; i < links.length; i++) {
  if (links[i].href.indexOf('Course') !== -1) courses.push(links[i].text.substring(0,6).replace(/\s+/g,''));
}

//Iterate through 'courses' and navigate to grade book webpages for each course using an AJAX GET request
for (j = 0; j < courses.length; j++) {
  var url = 'https://cis.westpoint.edu/cis/Academic/CourseGradeBook.cfm?CourseNumber=' + courses[j];
  $.ajax({type: 'GET', url: url, ajaxI: j, async: false, /*Pass variable j to function using ajaxI.
                                                           Set async to false to wait for the 'grade2gpa' function to run.*/  
    success: function(html) {
      var totals = $(html).find('tr:last').text().replace(/\s+/g,',').split(','); /*Create array based on cells in the last row of the grade book table:
                                                                                    totals = ['TOTAL', <points earned>, <maximum possible points>, <grade>]*/
      var [earned, max, grade] = [parseFloat(totals[2]), parseFloat(totals[3]), totals[2]/totals[3]]; //Create equivalent variables based on array values
      actual[courses[this.ajaxI]] = [grade, grade2gpa(grade)]; //Add course grade and equivalent GPA value to the 'actual' dictionary
      points[courses[this.ajaxI]] = [earned, max]; //Add earned and maximum course points to the 'points' dictionary
    }
  });
}
  
//Returns equivalent GPA value for inputted grade
function grade2gpa(grade) {
  if (isNaN(grade)) return NaN;
  else if (               grade >= .97) return gpaValues[0];
  else if (.97 > grade && grade >= .93) return gpaValues[1];
  else if (.93 > grade && grade >= .90) return gpaValues[2];
  else if (.90 > grade && grade >= .87) return gpaValues[3];
  else if (.87 > grade && grade >= .83) return gpaValues[4];
  else if (.83 > grade && grade >= .80) return gpaValues[5];
  else if (.80 > grade && grade >= .77) return gpaValues[6];
  else if (.77 > grade && grade >= .73) return gpaValues[7];
  else if (.73 > grade && grade >= .70) return gpaValues[8];
  else if (.70 > grade && grade >= .67) return gpaValues[9];
  else return gpaValues[10];
}

/** 
 * Credit hours were obtained by using the below code (lines 55-62) and manually storing them in the 'creditHours' dictionary.
 * Same origin policy blocks cross-origin requests, so no known way to automatically get HTML content from the RedBook while on CIS.
 *
 * window.location.href = 'https://courses.westpoint.edu/crse_offerings.cfm?ayt_offerings=true&acad_yr=2021&term=2';
 * var rows = document.getElementsByTagName('tr');
 * var creditHours = {};
 * for (i = 0; i < rows.length; i++) {
 *   if (rows[i].innerText.match(/[0-9]\.[0-9]/) !== null) {
 *     creditHours[rows[i].innerText.substring(0,6).replace(/\s/g,'')] = rows[i].innerText.match(/[0-9]\.[0-9]/)[0];
 *   }
 * }
 */
var creditHours = { //534 courses for academic year 2021-2  
  "CE189" : "1.0",    "CE189A": "1.0",    "CE289" : "2.0",    "CE350" : "3.0",    "CE371" : "3.5",
  "CE389" : "3.0",    "CE401" : "3.0",    "CE404" : "3.5",    "CE450" : "3.0",    "CE489" : "3.0",  
  "CE489A": "3.0",    "CE490" : "3.0",    "CE491" : "3.0",    "CE494" : "3.5",    "CH101" : "4.0",
  "CH102" : "4.0",    "CH275" : "4.0",    "CH289" : "1.0",    "CH290" : "1.0",    "CH292" : "1.0",  
  "CH362" : "3.5",    "CH364" : "3.5",    "CH367" : "3.0",    "CH371" : "3.5",    "CH376" : "3.0",
  "CH384" : "3.5",    "CH387" : "3.5",    "CH388" : "3.0",    "CH389" : "1.5",    "CH390" : "1.5",
  "CH391" : "1.5",    "CH392" : "1.5",    "CH400" : "1.5",    "CH402" : "3.5",    "CH450" : "3.0",
  "CH460" : "3.5",    "CH471" : "3.5",    "CH473" : "3.5",    "CH479" : "3.5",    "CH482" : "3.5",
  "CH487" : "3.0",    "CH489" : "3.0",    "CH490" : "3.0",    "CH491" : "3.0",    "CH492" : "3.0",
  "CS380" : "3.0",    "CS384" : "3.0",    "CS385" : "3.0",    "CS400" : "3.0",    "CS403" : "3.0",
  "CS473" : "3.0",    "CS474" : "3.0",    "CS483" : "3.0",    "CS484" : "3.0",    "CS485" : "3.0",
  "CS489" : "3.0",    "CS489A": "3.0",    "CY105" : "3.0",    "CY155" : "3.0",    "CY300" : "3.0",
  "CY305" : "3.0",    "CY350" : "3.0",    "CY384" : "3.0",    "CY385X": "3.0",    "CY389X": "2.0",
  "CY394" : "3.0",    "CY450" : "3.0",    "DC100" : "3.0",    "DC200" : "3.0",    "DC201" : "3.0",
  "DC301" : "3.0",    "DC302" : "3.0",    "DC303" : "3.0",    "DC500" : "3.0",    "DC501" : "3.0",
  "DC600" : "3.0",    "DS345" : "3.0",    "DS350" : "3.0",    "DS360" : "3.0",    "DS370" : "3.0",
  "DS455" : "3.0",    "DS460" : "3.0",    "DS475" : "3.0",    "DS489" : "3.0",    "DS490" : "3.0",
  "DS496" : "3.0",    "DS497" : "3.0",    "EE301" : "3.5",    "EE302" : "3.5",    "EE350" : "3.0",
  "EE360" : "3.5",    "EE383" : "3.5",    "EE400" : "3.0",    "EE450" : "3.0",    "EE462" : "3.5",
  "EE477" : "3.0",    "EE482" : "3.0",    "EE483" : "3.0",    "EE486" : "3.0",    "EE487" : "3.0",
  "EE489" : "3.0",    "EE489A": "3.0",    "EM381" : "3.0",    "EM384" : "3.0",    "EM403" : "4.0",
  "EM411" : "3.5",    "EM481" : "3.5",    "EM482" : "3.0",    "EN101" : "3.0",    "EN102" : "3.0",
  "EN152" : "3.0",    "EN332" : "3.0",    "EN352" : "3.0",    "EN353" : "3.0",    "EN354" : "3.0",
  "EN354A": "3.0",    "EN370" : "3.0",    "EN402" : "3.0",    "EN490" : "3.0",    "EV203" : "3.0",
  "EV289A": "1.0",    "EV289B": "1.0",    "EV350" : "3.0",    "EV365" : "3.0",    "EV372" : "3.0",
  "EV375" : "3.0",    "EV379" : "3.0",    "EV386" : "3.0",    "EV387" : "3.0",    "EV388A": "3.5",
  "EV388B": "3.0",    "EV389A": "2.0",    "EV389C": "2.0",    "EV390B": "3.0",    "EV391B": "3.0",
  "EV396" : "3.5",    "EV397" : "3.0",    "EV398" : "3.0",    "EV401" : "3.5",    "EV450" : "3.0",
  "EV477" : "3.0",    "EV478" : "3.0",    "EV481" : "3.0",    "EV482" : "3.0",    "EV483" : "3.0",
  "EV486" : "3.0",    "EV487" : "3.0",    "EV488" : "3.5",    "EV489A": "3.0",    "EV489B": "3.0",
  "EV489D": "3.0",    "EV491" : "3.0",    "HI101" : "3.0",    "HI105" : "3.0",    "HI108" : "3.0",
  "HI108A": "3.0",    "HI108E": "3.0",    "HI108L": "3.0",    "HI108M": "3.0",    "HI108R": "3.0",
  "HI108U": "3.0",    "HI155" : "3.0",    "HI158A": "3.0",    "HI158E": "3.0",    "HI158L": "3.0",
  "HI158M": "3.0",    "HI158R": "3.0",    "HI158U": "3.0",    "HI302" : "3.0",    "HI302H": "3.0",
  "HI302X": "3.0",    "HI344" : "3.0",    "HI354" : "3.0",    "HI355" : "3.0",    "HI361" : "3.0",
  "HI369" : "3.0",    "HI376" : "3.0",    "HI383" : "3.0",    "HI385" : "3.0",    "HI391" : "3.0",
  "HI395" : "3.0",    "HI460" : "3.0",    "HI463" : "3.0",    "HI464" : "3.0",    "HI498" : "3.0",
  "HI499" : "3.0",    "IT383" : "3.0",    "IT384" : "3.0",    "IT394" : "3.0",    "IT400" : "3.0",
  "IT485" : "3.0",    "IT493" : "3.0",    "KN355" : "3.5",    "KN455" : "3.0",    "KN467X": "3.0",
  "KN480" : "3.0",    "KN485" : "3.0",    "KN491" : "1.0",    "KN492" : "2.0",    "KN493" : "3.0",
  "KN495" : "3.0",    "LA204" : "4.0",    "LA372" : "3.0",    "LA472" : "3.0",    "LA476" : "3.0",
  "LA484" : "3.0",    "LC204" : "4.0",    "LC372" : "3.0",    "LC476" : "3.0",    "LC484" : "3.0",
  "LC486" : "3.0",    "LC492" : "3.0",    "LE102" : "3.5",    "LF204" : "4.0",    "LF372" : "3.0",
  "LF476" : "3.0",    "LF484" : "3.0",    "LF492" : "3.0",    "LG204" : "4.0",    "LG372" : "3.0",
  "LG476" : "3.0",    "LG484" : "3.0",    "LG492" : "3.0",    "LN287A": "1.0",    "LN380" : "3.0",
  "LN387" : "2.0",    "LN451" : "3.0",    "LN482H": "3.0",    "LN482J": "3.0",    "LN488" : "3.0",
  "LN488A": "3.0",    "LN490" : "3.0",    "LN491" : "3.0",    "LN492" : "3.0",    "LN493" : "3.0",
  "LN494" : "3.0",    "LN495" : "3.0",    "LP204" : "4.0",    "LP372" : "3.0",    "LP476" : "3.0",
  "LP484" : "3.0",    "LP492" : "3.0",    "LR204" : "4.0",    "LR372" : "3.0",    "LR476" : "3.0",
  "LR484" : "3.0",    "LR486" : "3.0",    "LS204" : "4.0",    "LS372" : "3.0",    "LS476" : "3.0",
  "LS484" : "3.0",    "LS486" : "3.0",    "LW403" : "3.0",    "LW410" : "3.0",    "LW461" : "3.0",
  "LW462" : "3.0",    "LW472" : "3.0",    "LW474" : "3.0",    "LW475" : "3.0",    "LW476" : "3.0",
  "LW481" : "3.0",    "LW488" : "3.0",    "LW490" : "3.0",    "LW495" : "3.0",    "LW499" : "3.0",
  "LZ204" : "4.0",    "LZ372" : "3.0",    "LZ476" : "3.0",    "MA100" : "3.5",    "MA103" : "4.5",
  "MA104" : "4.5",    "MA205" : "4.0",    "MA206" : "3.0",    "MA255" : "4.5",    "MA256" : "3.0",
  "MA364" : "3.0",    "MA365" : "3.0",    "MA366" : "4.5",    "MA367" : "3.0",    "MA371" : "3.0",
  "MA372" : "3.0",    "MA376" : "3.0",    "MA387" : "3.0",    "MA388" : "3.0",    "MA389" : "2.0",
  "MA391" : "3.0",    "MA396" : "3.0",    "MA462" : "3.0",    "MA464" : "3.0",    "MA476" : "3.0",
  "MA477" : "3.0",    "MA478" : "3.0",    "MA481" : "3.0",    "MA485" : "3.0",    "MA489" : "3.0",
  "MA490" : "3.0",    "MA491" : "3.0",    "MA493E": "3.0",    "MA499" : "3.0",    "MC300" : "3.0",
  "MC306" : "3.0",    "MC311" : "3.5",    "MC312" : "3.0",    "MC364" : "3.5",    "MC380" : "3.5",
  "MC486" : "3.0",    "MD101" : "0.0",    "MD102" : "0.0",    "MD201" : "0.0",    "MD202" : "0.0",
  "MD301" : "0.0",    "MD302" : "0.0",    "MD401" : "0.0",    "MD402" : "0.0",    "MD404" : "0.0",
  "ME189" : "1.0",    "ME189A": "1.0",    "ME289" : "2.0",    "ME289A": "2.0",    "ME370" : "3.0",
  "ME387" : "3.0",    "ME388" : "3.0",    "ME389" : "3.0",    "ME389A": "3.0",    "ME403" : "3.5",
  "ME472" : "3.0",    "ME480" : "3.5",    "ME489" : "3.0",    "ME489A": "3.0",    "ME489B": "3.0",
  "ME491" : "3.0",    "ME496" : "3.5",    "MG380" : "3.0",    "MG390" : "3.0",    "MG395" : "3.0",
  "MG421" : "3.0",    "MG462" : "3.0",    "MS100" : "1.5",    "MS200" : "1.5",    "MS300" : "1.5",
  "MX400" : "3.0",    "NE189" : "1.0",    "NE189A": "1.0",    "NE289" : "2.0",    "NE289A": "2.0",
  "NE300" : "3.0",    "NE350" : "3.0",    "NE355" : "3.5",    "NE361" : "3.0",    "NE389" : "3.0",
  "NE389A": "3.0",    "NE400" : "1.0",    "NE450" : "3.0",    "NE489" : "3.0",    "NE489A": "3.0",
  "NE496" : "3.0",    "PE116" : "0.5",    "PE116W": "0.5",    "PE117" : "0.5",    "PE215" : "1.5",
  "PE220" : "0.5",    "PE223" : "0.5",    "PE230" : "0.5",    "PE234" : "0.5",    "PE238" : "0.5",
  "PE245" : "0.5",    "PE248" : "0.5",    "PE250" : "0.5",    "PE252" : "0.5",    "PE256" : "0.5",
  "PE262" : "0.5",    "PE264" : "0.5",    "PE266" : "0.5",    "PE320" : "0.5",    "PE321" : "0.5",
  "PE322" : "0.5",    "PE323" : "0.5",    "PE360" : "0.5",    "PE450" : "1.5",    "PH189" : "1.0",
  "PH189A": "1.0",    "PH205" : "4.0",    "PH206" : "4.0",    "PH255" : "4.0",    "PH256" : "4.0",
  "PH289" : "2.0",    "PH289A": "2.0",    "PH365" : "3.0",    "PH384" : "3.0",    "PH389" : "3.0",
  "PH389A": "3.0",    "PH481" : "3.0",    "PH482" : "3.0",    "PH486" : "3.5",    "PH487" : "3.0",
  "PH489" : "3.0",    "PH489A": "3.0",    "PH495" : "3.0",    "PL100" : "3.0",    "PL150" : "3.0",
  "PL289" : "1.0",    "PL300" : "3.0",    "PL350" : "3.0",    "PL360" : "3.0",    "PL371" : "3.0",
  "PL372" : "3.0",    "PL376" : "3.0",    "PL383" : "3.0",    "PL384" : "3.0",    "PL387" : "3.0",
  "PL389" : "2.0",    "PL391" : "3.0",    "PL392" : "3.0",    "PL393" : "3.0",    "PL394" : "3.0",
  "PL398" : "3.0",    "PL462" : "3.0",    "PL471" : "3.0",    "PL482" : "3.0",    "PL488B": "3.0",
  "PL488D": "3.0",    "PL488E": "3.0",    "PL489" : "3.0",    "PL489A": "3.0",    "PL490" : "3.0",
  "PL498" : "3.0",    "PY201" : "3.0",    "PY251" : "3.0",    "PY305" : "3.0",    "PY320" : "3.0",
  "PY355" : "3.0",    "PY375" : "3.0",    "PY380" : "3.0",    "PY400" : "3.0",    "PY491" : "3.0",
  "RS100" : "0.5",    "RS101" : "0.5",    "RS102" : "0.0",    "RS103" : "0.5",    "RS104" : "0.5",
  "SE301" : "3.0",    "SE302" : "3.0",    "SE370" : "3.0",    "SE375" : "3.0",    "SE385" : "3.0",
  "SE388" : "3.0",    "SE400" : "1.0",    "SE403" : "4.0",    "SE450" : "3.0",    "SE489" : "3.0",
  "SE490" : "3.0",    "SE491" : "3.0",    "SP189" : "1.0",    "SP189A": "1.0",    "SP289" : "2.0",
  "SP289A": "2.0",    "SP389" : "3.0",    "SP389A": "3.0",    "SP472" : "3.0",    "SP474" : "3.0",
  "SP489" : "3.0",    "SP489A": "3.0",    "SS201" : "3.0",    "SS202" : "3.0",    "SS251" : "3.0",
  "SS252" : "3.0",    "SS289B": "1.0",    "SS307" : "3.0",    "SS360" : "3.0",    "SS364" : "3.0",
  "SS366" : "3.0",    "SS368" : "3.0",    "SS370" : "3.0",    "SS376" : "3.0",    "SS377" : "3.0",
  "SS379" : "3.0",    "SS380" : "3.0",    "SS382" : "3.0",    "SS383" : "3.0",    "SS385" : "3.0",
  "SS386" : "3.0",    "SS388" : "3.0",    "SS391" : "3.0",    "SS392" : "3.0",    "SS394" : "3.0",
  "SS457" : "3.0",    "SS461" : "3.0",    "SS463" : "3.0",    "SS464" : "3.0",    "SS465" : "3.0",
  "SS466" : "3.0",    "SS470" : "3.0",    "SS472" : "3.0",    "SS473" : "3.0",    "SS477" : "3.0",
  "SS481" : "3.0",    "SS483" : "3.0",    "SS484" : "3.0",    "SS486" : "3.0",    "SS487" : "3.0",
  "SS489C": "3.0",    "SS490A": "3.0",    "SS490B": "3.0",    "SS490D": "3.0",    "SS490E": "3.0",
  "SS491" : "3.0",    "SS493" : "3.0",    "SS495" : "3.0",    "SS498A": "3.0",    "SS498B": "3.0",
  "SS498C": "3.0",    "WR303" : "3.0",    "WR313" : "2.0",    "XE383" : "3.0",    "XE402" : "3.5",
  "XE472" : "3.0",    "XH102" : "1.0",    "XH200X": "1.5",    "XH202" : "1.0",    "XH302" : "1.0",
  "XH402" : "1.0",    "XH405" : "3.0",    "XH497" : "3.0",    "XS391" : "3.0",    "ZH315" : "3.0",
  "ZH325" : "3.0",    "ZH335" : "3.0",    "ZH345" : "3.0",    "ZH355" : "3.0",    "ZH365" : "3.0",
  "ZH367" : "3.0",    "ZH377" : "3.0",    "ZH467" : "3.0",    "ZH477" : "3.0"};
  
var rows = document.getElementsByTagName('tr'); //Get array of all table rows on webpage
var completion = new Array(); //Initialize array to store course completion percentage
for (k = 0; k < rows.length; k++) {
  if (rows[k].innerHTML.indexOf('Course') !== -1 && rows[k].innerHTML.indexOf('Home Page') == -1) { //Check if row contains course and ignore the homepage since it produces duplicate results
    var length = rows[k].innerText.length;
    var completed = rows[k].innerText.substring(length-3, length-1).replace(/\s+/g,''); //Completion percentage is found in the last 2-3 characters of the row
    completion.push(completed/100); //Change completion percentage to decimal and add to 'completion' array
  }
}

//Iterate through 'courses' and add maximum possible course grade and GPA value to the 'possible' dictionary  
for (l = 0; l < courses.length; l++) {
  var course = courses[l];
  var total = Math.round(points[course][1]/completion[l]); //Divide maximum points by completion percentage to find total course points
  var maxGrade = (total-(points[course][1]-points[course][0]))/total; //Subtract total course points by the difference between max and earned points and divide by total course points to find the maximum possible grade
  possible[course] = [maxGrade, grade2gpa(maxGrade)]; //Add course grade and equivalent GPA value to the 'possible' dictionary
}

/*Calculate GPA based on course credits and individual course GPA values.
  GPA is calculated by averaging the course GPA values while accounting for the number of credits per course.*/
function gpaCalculator(dictionary) {
  var [weighted, totalCredits] = [0, 0]; //'weighted' is the course gpa value multiplied by the number of credits
  for (var gpaValue in dictionary) {
    var gpa = dictionary[gpaValue][1];
    if (!isNaN(gpa)) {
      var credits = parseFloat(creditHours[gpaValue]);
      weighted += gpa*credits;
      totalCredits += credits;
    }
  }
  return weighted/totalCredits;
}
  
var [currentGrades, maxGrades] = [new Array(), new Array()];
var [success, error] = [' Class    Current Grade   Maximum Possible Grade\n', '']; //Create success message header and default error message
for (m = 0; m < courses.length; m++) {
  if (isNaN(actual[courses[m]][0])) { /*Check if course grade is Not-a-Number (NaN).
                                        Initial web scrape could have been unsuccessful if grades were not published on the course grade book.*/
    error += ('*' + courses[m] + ' is ignored due to lack of published grades'); 
  } else if (courses[m].substring(0,2) == 'DC' || //Check if the course should not be factored into the GPA calculation (Directed Underload or Military Development)
             courses[m].substring(0,2) == 'MD' || //or if the course is not academic (Military Science or Physical Education)
             courses[m].substring(0,2) == 'MS' ||  
             courses[m].substring(0,2) == 'PE') {
    error += ('*' + courses[m] + ' is ignored because it is not an academic class\n');
  } else { //Otherwise add course, current grade, and maximum possible grade to success message with adequate spacing
    success += courses[m] + '          ' + (actual[courses[m]][0]*100).toFixed(2) + '                        ' + (possible[courses[m]][0]*100).toFixed(2) + '\n';
  }
}

//Calculate current and maximum possible GPAs and round to 3 decimal places
var actualGPA = gpaCalculator(actual).toFixed(3); 
var possibleGPA = gpaCalculator(possible).toFixed(3);

//Check if GPAs were computed successfully and print formatted messages using the JavaScript alert() function
if (!isNaN(actualGPA) && !isNaN(possibleGPA)) {
  success += '\nCurrent GPA: ' + actualGPA + '\n' + 'Maximum Possible GPA: ' + possibleGPA;
  alert(success + '\n\n' + error);
} else alert('Error: GPA cannot be calculated!');