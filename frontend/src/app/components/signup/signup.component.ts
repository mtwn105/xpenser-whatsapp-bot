import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToasterService } from '../../services/toaster.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, NgOtpInputModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, OnChanges {
  countries = [
    {
      "name": "Afghanistan",
      "dial_code": "+93",
      "code": "AF"
    },
    {
      "name": "Aland Islands",
      "dial_code": "+358",
      "code": "AX"
    },
    {
      "name": "Albania",
      "dial_code": "+355",
      "code": "AL"
    },
    {
      "name": "Algeria",
      "dial_code": "+213",
      "code": "DZ"
    },
    {
      "name": "AmericanSamoa",
      "dial_code": "+1684",
      "code": "AS"
    },
    {
      "name": "Andorra",
      "dial_code": "+376",
      "code": "AD"
    },
    {
      "name": "Angola",
      "dial_code": "+244",
      "code": "AO"
    },
    {
      "name": "Anguilla",
      "dial_code": "+1264",
      "code": "AI"
    },
    {
      "name": "Antarctica",
      "dial_code": "+672",
      "code": "AQ"
    },
    {
      "name": "Antigua and Barbuda",
      "dial_code": "+1268",
      "code": "AG"
    },
    {
      "name": "Argentina",
      "dial_code": "+54",
      "code": "AR"
    },
    {
      "name": "Armenia",
      "dial_code": "+374",
      "code": "AM"
    },
    {
      "name": "Aruba",
      "dial_code": "+297",
      "code": "AW"
    },
    {
      "name": "Australia",
      "dial_code": "+61",
      "code": "AU"
    },
    {
      "name": "Austria",
      "dial_code": "+43",
      "code": "AT"
    },
    {
      "name": "Azerbaijan",
      "dial_code": "+994",
      "code": "AZ"
    },
    {
      "name": "Bahamas",
      "dial_code": "+1242",
      "code": "BS"
    },
    {
      "name": "Bahrain",
      "dial_code": "+973",
      "code": "BH"
    },
    {
      "name": "Bangladesh",
      "dial_code": "+880",
      "code": "BD"
    },
    {
      "name": "Barbados",
      "dial_code": "+1246",
      "code": "BB"
    },
    {
      "name": "Belarus",
      "dial_code": "+375",
      "code": "BY"
    },
    {
      "name": "Belgium",
      "dial_code": "+32",
      "code": "BE"
    },
    {
      "name": "Belize",
      "dial_code": "+501",
      "code": "BZ"
    },
    {
      "name": "Benin",
      "dial_code": "+229",
      "code": "BJ"
    },
    {
      "name": "Bermuda",
      "dial_code": "+1441",
      "code": "BM"
    },
    {
      "name": "Bhutan",
      "dial_code": "+975",
      "code": "BT"
    },
    {
      "name": "Bolivia, Plurinational State of",
      "dial_code": "+591",
      "code": "BO"
    },
    {
      "name": "Bosnia and Herzegovina",
      "dial_code": "+387",
      "code": "BA"
    },
    {
      "name": "Botswana",
      "dial_code": "+267",
      "code": "BW"
    },
    {
      "name": "Brazil",
      "dial_code": "+55",
      "code": "BR"
    },
    {
      "name": "British Indian Ocean Territory",
      "dial_code": "+246",
      "code": "IO"
    },
    {
      "name": "Brunei Darussalam",
      "dial_code": "+673",
      "code": "BN"
    },
    {
      "name": "Bulgaria",
      "dial_code": "+359",
      "code": "BG"
    },
    {
      "name": "Burkina Faso",
      "dial_code": "+226",
      "code": "BF"
    },
    {
      "name": "Burundi",
      "dial_code": "+257",
      "code": "BI"
    },
    {
      "name": "Cambodia",
      "dial_code": "+855",
      "code": "KH"
    },
    {
      "name": "Cameroon",
      "dial_code": "+237",
      "code": "CM"
    },
    {
      "name": "Canada",
      "dial_code": "+1",
      "code": "CA"
    },
    {
      "name": "Cape Verde",
      "dial_code": "+238",
      "code": "CV"
    },
    {
      "name": "Cayman Islands",
      "dial_code": "+ 345",
      "code": "KY"
    },
    {
      "name": "Central African Republic",
      "dial_code": "+236",
      "code": "CF"
    },
    {
      "name": "Chad",
      "dial_code": "+235",
      "code": "TD"
    },
    {
      "name": "Chile",
      "dial_code": "+56",
      "code": "CL"
    },
    {
      "name": "China",
      "dial_code": "+86",
      "code": "CN"
    },
    {
      "name": "Christmas Island",
      "dial_code": "+61",
      "code": "CX"
    },
    {
      "name": "Cocos (Keeling) Islands",
      "dial_code": "+61",
      "code": "CC"
    },
    {
      "name": "Colombia",
      "dial_code": "+57",
      "code": "CO"
    },
    {
      "name": "Comoros",
      "dial_code": "+269",
      "code": "KM"
    },
    {
      "name": "Congo",
      "dial_code": "+242",
      "code": "CG"
    },
    {
      "name": "Congo, The Democratic Republic of the Congo",
      "dial_code": "+243",
      "code": "CD"
    },
    {
      "name": "Cook Islands",
      "dial_code": "+682",
      "code": "CK"
    },
    {
      "name": "Costa Rica",
      "dial_code": "+506",
      "code": "CR"
    },
    {
      "name": "Cote d'Ivoire",
      "dial_code": "+225",
      "code": "CI"
    },
    {
      "name": "Croatia",
      "dial_code": "+385",
      "code": "HR"
    },
    {
      "name": "Cuba",
      "dial_code": "+53",
      "code": "CU"
    },
    {
      "name": "Cyprus",
      "dial_code": "+357",
      "code": "CY"
    },
    {
      "name": "Czech Republic",
      "dial_code": "+420",
      "code": "CZ"
    },
    {
      "name": "Denmark",
      "dial_code": "+45",
      "code": "DK"
    },
    {
      "name": "Djibouti",
      "dial_code": "+253",
      "code": "DJ"
    },
    {
      "name": "Dominica",
      "dial_code": "+1767",
      "code": "DM"
    },
    {
      "name": "Dominican Republic",
      "dial_code": "+1849",
      "code": "DO"
    },
    {
      "name": "Ecuador",
      "dial_code": "+593",
      "code": "EC"
    },
    {
      "name": "Egypt",
      "dial_code": "+20",
      "code": "EG"
    },
    {
      "name": "El Salvador",
      "dial_code": "+503",
      "code": "SV"
    },
    {
      "name": "Equatorial Guinea",
      "dial_code": "+240",
      "code": "GQ"
    },
    {
      "name": "Eritrea",
      "dial_code": "+291",
      "code": "ER"
    },
    {
      "name": "Estonia",
      "dial_code": "+372",
      "code": "EE"
    },
    {
      "name": "Ethiopia",
      "dial_code": "+251",
      "code": "ET"
    },
    {
      "name": "Falkland Islands (Malvinas)",
      "dial_code": "+500",
      "code": "FK"
    },
    {
      "name": "Faroe Islands",
      "dial_code": "+298",
      "code": "FO"
    },
    {
      "name": "Fiji",
      "dial_code": "+679",
      "code": "FJ"
    },
    {
      "name": "Finland",
      "dial_code": "+358",
      "code": "FI"
    },
    {
      "name": "France",
      "dial_code": "+33",
      "code": "FR"
    },
    {
      "name": "French Guiana",
      "dial_code": "+594",
      "code": "GF"
    },
    {
      "name": "French Polynesia",
      "dial_code": "+689",
      "code": "PF"
    },
    {
      "name": "Gabon",
      "dial_code": "+241",
      "code": "GA"
    },
    {
      "name": "Gambia",
      "dial_code": "+220",
      "code": "GM"
    },
    {
      "name": "Georgia",
      "dial_code": "+995",
      "code": "GE"
    },
    {
      "name": "Germany",
      "dial_code": "+49",
      "code": "DE"
    },
    {
      "name": "Ghana",
      "dial_code": "+233",
      "code": "GH"
    },
    {
      "name": "Gibraltar",
      "dial_code": "+350",
      "code": "GI"
    },
    {
      "name": "Greece",
      "dial_code": "+30",
      "code": "GR"
    },
    {
      "name": "Greenland",
      "dial_code": "+299",
      "code": "GL"
    },
    {
      "name": "Grenada",
      "dial_code": "+1473",
      "code": "GD"
    },
    {
      "name": "Guadeloupe",
      "dial_code": "+590",
      "code": "GP"
    },
    {
      "name": "Guam",
      "dial_code": "+1671",
      "code": "GU"
    },
    {
      "name": "Guatemala",
      "dial_code": "+502",
      "code": "GT"
    },
    {
      "name": "Guernsey",
      "dial_code": "+44",
      "code": "GG"
    },
    {
      "name": "Guinea",
      "dial_code": "+224",
      "code": "GN"
    },
    {
      "name": "Guinea-Bissau",
      "dial_code": "+245",
      "code": "GW"
    },
    {
      "name": "Guyana",
      "dial_code": "+595",
      "code": "GY"
    },
    {
      "name": "Haiti",
      "dial_code": "+509",
      "code": "HT"
    },
    {
      "name": "Holy See (Vatican City State)",
      "dial_code": "+379",
      "code": "VA"
    },
    {
      "name": "Honduras",
      "dial_code": "+504",
      "code": "HN"
    },
    {
      "name": "Hong Kong",
      "dial_code": "+852",
      "code": "HK"
    },
    {
      "name": "Hungary",
      "dial_code": "+36",
      "code": "HU"
    },
    {
      "name": "Iceland",
      "dial_code": "+354",
      "code": "IS"
    },
    {
      "name": "India",
      "dial_code": "+91",
      "code": "IN"
    },
    {
      "name": "Indonesia",
      "dial_code": "+62",
      "code": "ID"
    },
    {
      "name": "Iran, Islamic Republic of Persian Gulf",
      "dial_code": "+98",
      "code": "IR"
    },
    {
      "name": "Iraq",
      "dial_code": "+964",
      "code": "IQ"
    },
    {
      "name": "Ireland",
      "dial_code": "+353",
      "code": "IE"
    },
    {
      "name": "Isle of Man",
      "dial_code": "+44",
      "code": "IM"
    },
    {
      "name": "Israel",
      "dial_code": "+972",
      "code": "IL"
    },
    {
      "name": "Italy",
      "dial_code": "+39",
      "code": "IT"
    },
    {
      "name": "Jamaica",
      "dial_code": "+1876",
      "code": "JM"
    },
    {
      "name": "Japan",
      "dial_code": "+81",
      "code": "JP"
    },
    {
      "name": "Jersey",
      "dial_code": "+44",
      "code": "JE"
    },
    {
      "name": "Jordan",
      "dial_code": "+962",
      "code": "JO"
    },
    {
      "name": "Kazakhstan",
      "dial_code": "+77",
      "code": "KZ"
    },
    {
      "name": "Kenya",
      "dial_code": "+254",
      "code": "KE"
    },
    {
      "name": "Kiribati",
      "dial_code": "+686",
      "code": "KI"
    },
    {
      "name": "Korea, Democratic People's Republic of Korea",
      "dial_code": "+850",
      "code": "KP"
    },
    {
      "name": "Korea, Republic of South Korea",
      "dial_code": "+82",
      "code": "KR"
    },
    {
      "name": "Kuwait",
      "dial_code": "+965",
      "code": "KW"
    },
    {
      "name": "Kyrgyzstan",
      "dial_code": "+996",
      "code": "KG"
    },
    {
      "name": "Laos",
      "dial_code": "+856",
      "code": "LA"
    },
    {
      "name": "Latvia",
      "dial_code": "+371",
      "code": "LV"
    },
    {
      "name": "Lebanon",
      "dial_code": "+961",
      "code": "LB"
    },
    {
      "name": "Lesotho",
      "dial_code": "+266",
      "code": "LS"
    },
    {
      "name": "Liberia",
      "dial_code": "+231",
      "code": "LR"
    },
    {
      "name": "Libyan Arab Jamahiriya",
      "dial_code": "+218",
      "code": "LY"
    },
    {
      "name": "Liechtenstein",
      "dial_code": "+423",
      "code": "LI"
    },
    {
      "name": "Lithuania",
      "dial_code": "+370",
      "code": "LT"
    },
    {
      "name": "Luxembourg",
      "dial_code": "+352",
      "code": "LU"
    },
    {
      "name": "Macao",
      "dial_code": "+853",
      "code": "MO"
    },
    {
      "name": "Macedonia",
      "dial_code": "+389",
      "code": "MK"
    },
    {
      "name": "Madagascar",
      "dial_code": "+261",
      "code": "MG"
    },
    {
      "name": "Malawi",
      "dial_code": "+265",
      "code": "MW"
    },
    {
      "name": "Malaysia",
      "dial_code": "+60",
      "code": "MY"
    },
    {
      "name": "Maldives",
      "dial_code": "+960",
      "code": "MV"
    },
    {
      "name": "Mali",
      "dial_code": "+223",
      "code": "ML"
    },
    {
      "name": "Malta",
      "dial_code": "+356",
      "code": "MT"
    },
    {
      "name": "Marshall Islands",
      "dial_code": "+692",
      "code": "MH"
    },
    {
      "name": "Martinique",
      "dial_code": "+596",
      "code": "MQ"
    },
    {
      "name": "Mauritania",
      "dial_code": "+222",
      "code": "MR"
    },
    {
      "name": "Mauritius",
      "dial_code": "+230",
      "code": "MU"
    },
    {
      "name": "Mayotte",
      "dial_code": "+262",
      "code": "YT"
    },
    {
      "name": "Mexico",
      "dial_code": "+52",
      "code": "MX"
    },
    {
      "name": "Micronesia, Federated States of Micronesia",
      "dial_code": "+691",
      "code": "FM"
    },
    {
      "name": "Moldova",
      "dial_code": "+373",
      "code": "MD"
    },
    {
      "name": "Monaco",
      "dial_code": "+377",
      "code": "MC"
    },
    {
      "name": "Mongolia",
      "dial_code": "+976",
      "code": "MN"
    },
    {
      "name": "Montenegro",
      "dial_code": "+382",
      "code": "ME"
    },
    {
      "name": "Montserrat",
      "dial_code": "+1664",
      "code": "MS"
    },
    {
      "name": "Morocco",
      "dial_code": "+212",
      "code": "MA"
    },
    {
      "name": "Mozambique",
      "dial_code": "+258",
      "code": "MZ"
    },
    {
      "name": "Myanmar",
      "dial_code": "+95",
      "code": "MM"
    },
    {
      "name": "Namibia",
      "dial_code": "+264",
      "code": "NA"
    },
    {
      "name": "Nauru",
      "dial_code": "+674",
      "code": "NR"
    },
    {
      "name": "Nepal",
      "dial_code": "+977",
      "code": "NP"
    },
    {
      "name": "Netherlands",
      "dial_code": "+31",
      "code": "NL"
    },
    {
      "name": "Netherlands Antilles",
      "dial_code": "+599",
      "code": "AN"
    },
    {
      "name": "New Caledonia",
      "dial_code": "+687",
      "code": "NC"
    },
    {
      "name": "New Zealand",
      "dial_code": "+64",
      "code": "NZ"
    },
    {
      "name": "Nicaragua",
      "dial_code": "+505",
      "code": "NI"
    },
    {
      "name": "Niger",
      "dial_code": "+227",
      "code": "NE"
    },
    {
      "name": "Nigeria",
      "dial_code": "+234",
      "code": "NG"
    },
    {
      "name": "Niue",
      "dial_code": "+683",
      "code": "NU"
    },
    {
      "name": "Norfolk Island",
      "dial_code": "+672",
      "code": "NF"
    },
    {
      "name": "Northern Mariana Islands",
      "dial_code": "+1670",
      "code": "MP"
    },
    {
      "name": "Norway",
      "dial_code": "+47",
      "code": "NO"
    },
    {
      "name": "Oman",
      "dial_code": "+968",
      "code": "OM"
    },
    {
      "name": "Pakistan",
      "dial_code": "+92",
      "code": "PK"
    },
    {
      "name": "Palau",
      "dial_code": "+680",
      "code": "PW"
    },
    {
      "name": "Palestinian Territory, Occupied",
      "dial_code": "+970",
      "code": "PS"
    },
    {
      "name": "Panama",
      "dial_code": "+507",
      "code": "PA"
    },
    {
      "name": "Papua New Guinea",
      "dial_code": "+675",
      "code": "PG"
    },
    {
      "name": "Paraguay",
      "dial_code": "+595",
      "code": "PY"
    },
    {
      "name": "Peru",
      "dial_code": "+51",
      "code": "PE"
    },
    {
      "name": "Philippines",
      "dial_code": "+63",
      "code": "PH"
    },
    {
      "name": "Pitcairn",
      "dial_code": "+872",
      "code": "PN"
    },
    {
      "name": "Poland",
      "dial_code": "+48",
      "code": "PL"
    },
    {
      "name": "Portugal",
      "dial_code": "+351",
      "code": "PT"
    },
    {
      "name": "Puerto Rico",
      "dial_code": "+1939",
      "code": "PR"
    },
    {
      "name": "Qatar",
      "dial_code": "+974",
      "code": "QA"
    },
    {
      "name": "Romania",
      "dial_code": "+40",
      "code": "RO"
    },
    {
      "name": "Russia",
      "dial_code": "+7",
      "code": "RU"
    },
    {
      "name": "Rwanda",
      "dial_code": "+250",
      "code": "RW"
    },
    {
      "name": "Reunion",
      "dial_code": "+262",
      "code": "RE"
    },
    {
      "name": "Saint Barthelemy",
      "dial_code": "+590",
      "code": "BL"
    },
    {
      "name": "Saint Helena, Ascension and Tristan Da Cunha",
      "dial_code": "+290",
      "code": "SH"
    },
    {
      "name": "Saint Kitts and Nevis",
      "dial_code": "+1869",
      "code": "KN"
    },
    {
      "name": "Saint Lucia",
      "dial_code": "+1758",
      "code": "LC"
    },
    {
      "name": "Saint Martin",
      "dial_code": "+590",
      "code": "MF"
    },
    {
      "name": "Saint Pierre and Miquelon",
      "dial_code": "+508",
      "code": "PM"
    },
    {
      "name": "Saint Vincent and the Grenadines",
      "dial_code": "+1784",
      "code": "VC"
    },
    {
      "name": "Samoa",
      "dial_code": "+685",
      "code": "WS"
    },
    {
      "name": "San Marino",
      "dial_code": "+378",
      "code": "SM"
    },
    {
      "name": "Sao Tome and Principe",
      "dial_code": "+239",
      "code": "ST"
    },
    {
      "name": "Saudi Arabia",
      "dial_code": "+966",
      "code": "SA"
    },
    {
      "name": "Senegal",
      "dial_code": "+221",
      "code": "SN"
    },
    {
      "name": "Serbia",
      "dial_code": "+381",
      "code": "RS"
    },
    {
      "name": "Seychelles",
      "dial_code": "+248",
      "code": "SC"
    },
    {
      "name": "Sierra Leone",
      "dial_code": "+232",
      "code": "SL"
    },
    {
      "name": "Singapore",
      "dial_code": "+65",
      "code": "SG"
    },
    {
      "name": "Slovakia",
      "dial_code": "+421",
      "code": "SK"
    },
    {
      "name": "Slovenia",
      "dial_code": "+386",
      "code": "SI"
    },
    {
      "name": "Solomon Islands",
      "dial_code": "+677",
      "code": "SB"
    },
    {
      "name": "Somalia",
      "dial_code": "+252",
      "code": "SO"
    },
    {
      "name": "South Africa",
      "dial_code": "+27",
      "code": "ZA"
    },
    {
      "name": "South Sudan",
      "dial_code": "+211",
      "code": "SS"
    },
    {
      "name": "South Georgia and the South Sandwich Islands",
      "dial_code": "+500",
      "code": "GS"
    },
    {
      "name": "Spain",
      "dial_code": "+34",
      "code": "ES"
    },
    {
      "name": "Sri Lanka",
      "dial_code": "+94",
      "code": "LK"
    },
    {
      "name": "Sudan",
      "dial_code": "+249",
      "code": "SD"
    },
    {
      "name": "Suriname",
      "dial_code": "+597",
      "code": "SR"
    },
    {
      "name": "Svalbard and Jan Mayen",
      "dial_code": "+47",
      "code": "SJ"
    },
    {
      "name": "Swaziland",
      "dial_code": "+268",
      "code": "SZ"
    },
    {
      "name": "Sweden",
      "dial_code": "+46",
      "code": "SE"
    },
    {
      "name": "Switzerland",
      "dial_code": "+41",
      "code": "CH"
    },
    {
      "name": "Syrian Arab Republic",
      "dial_code": "+963",
      "code": "SY"
    },
    {
      "name": "Taiwan",
      "dial_code": "+886",
      "code": "TW"
    },
    {
      "name": "Tajikistan",
      "dial_code": "+992",
      "code": "TJ"
    },
    {
      "name": "Tanzania, United Republic of Tanzania",
      "dial_code": "+255",
      "code": "TZ"
    },
    {
      "name": "Thailand",
      "dial_code": "+66",
      "code": "TH"
    },
    {
      "name": "Timor-Leste",
      "dial_code": "+670",
      "code": "TL"
    },
    {
      "name": "Togo",
      "dial_code": "+228",
      "code": "TG"
    },
    {
      "name": "Tokelau",
      "dial_code": "+690",
      "code": "TK"
    },
    {
      "name": "Tonga",
      "dial_code": "+676",
      "code": "TO"
    },
    {
      "name": "Trinidad and Tobago",
      "dial_code": "+1868",
      "code": "TT"
    },
    {
      "name": "Tunisia",
      "dial_code": "+216",
      "code": "TN"
    },
    {
      "name": "Turkey",
      "dial_code": "+90",
      "code": "TR"
    },
    {
      "name": "Turkmenistan",
      "dial_code": "+993",
      "code": "TM"
    },
    {
      "name": "Turks and Caicos Islands",
      "dial_code": "+1649",
      "code": "TC"
    },
    {
      "name": "Tuvalu",
      "dial_code": "+688",
      "code": "TV"
    },
    {
      "name": "Uganda",
      "dial_code": "+256",
      "code": "UG"
    },
    {
      "name": "Ukraine",
      "dial_code": "+380",
      "code": "UA"
    },
    {
      "name": "United Arab Emirates",
      "dial_code": "+971",
      "code": "AE"
    },
    {
      "name": "United Kingdom",
      "dial_code": "+44",
      "code": "GB"
    },
    {
      "name": "United States",
      "dial_code": "+1",
      "code": "US"
    },
    {
      "name": "Uruguay",
      "dial_code": "+598",
      "code": "UY"
    },
    {
      "name": "Uzbekistan",
      "dial_code": "+998",
      "code": "UZ"
    },
    {
      "name": "Vanuatu",
      "dial_code": "+678",
      "code": "VU"
    },
    {
      "name": "Venezuela, Bolivarian Republic of Venezuela",
      "dial_code": "+58",
      "code": "VE"
    },
    {
      "name": "Vietnam",
      "dial_code": "+84",
      "code": "VN"
    },
    {
      "name": "Virgin Islands, British",
      "dial_code": "+1284",
      "code": "VG"
    },
    {
      "name": "Virgin Islands, U.S.",
      "dial_code": "+1340",
      "code": "VI"
    },
    {
      "name": "Wallis and Futuna",
      "dial_code": "+681",
      "code": "WF"
    },
    {
      "name": "Yemen",
      "dial_code": "+967",
      "code": "YE"
    },
    {
      "name": "Zambia",
      "dial_code": "+260",
      "code": "ZM"
    },
    {
      "name": "Zimbabwe",
      "dial_code": "+263",
      "code": "ZW"
    }
  ];

  currencyCodes = [
    {
      "country": "Afghanistan",
      "currency_code": "AFN"
    },
    {
      "country": "Albania",
      "currency_code": "ALL"
    },
    {
      "country": "Algeria",
      "currency_code": "DZD"
    },
    {
      "country": "American Samoa",
      "currency_code": "USD"
    },
    {
      "country": "Andorra",
      "currency_code": "EUR"
    },
    {
      "country": "Angola",
      "currency_code": "AOA"
    },
    {
      "country": "Anguilla",
      "currency_code": "XCD"
    },
    {
      "country": "Antarctica",
      "currency_code": "XCD"
    },
    {
      "country": "Antigua and Barbuda",
      "currency_code": "XCD"
    },
    {
      "country": "Argentina",
      "currency_code": "ARS"
    },
    {
      "country": "Armenia",
      "currency_code": "AMD"
    },
    {
      "country": "Aruba",
      "currency_code": "AWG"
    },
    {
      "country": "Australia",
      "currency_code": "AUD"
    },
    {
      "country": "Austria",
      "currency_code": "EUR"
    },
    {
      "country": "Azerbaijan",
      "currency_code": "AZN"
    },
    {
      "country": "Bahamas",
      "currency_code": "BSD"
    },
    {
      "country": "Bahrain",
      "currency_code": "BHD"
    },
    {
      "country": "Bangladesh",
      "currency_code": "BDT"
    },
    {
      "country": "Barbados",
      "currency_code": "BBD"
    },
    {
      "country": "Belarus",
      "currency_code": "BYR"
    },
    {
      "country": "Belgium",
      "currency_code": "EUR"
    },
    {
      "country": "Belize",
      "currency_code": "BZD"
    },
    {
      "country": "Benin",
      "currency_code": "XOF"
    },
    {
      "country": "Bermuda",
      "currency_code": "BMD"
    },
    {
      "country": "Bhutan",
      "currency_code": "BTN"
    },
    {
      "country": "Bolivia",
      "currency_code": "BOB"
    },
    {
      "country": "Bosnia and Herzegovina",
      "currency_code": "BAM"
    },
    {
      "country": "Botswana",
      "currency_code": "BWP"
    },
    {
      "country": "Bouvet Island",
      "currency_code": "NOK"
    },
    {
      "country": "Brazil",
      "currency_code": "BRL"
    },
    {
      "country": "British Indian Ocean Territory",
      "currency_code": "USD"
    },
    {
      "country": "Brunei",
      "currency_code": "BND"
    },
    {
      "country": "Bulgaria",
      "currency_code": "BGN"
    },
    {
      "country": "Burkina Faso",
      "currency_code": "XOF"
    },
    {
      "country": "Burundi",
      "currency_code": "BIF"
    },
    {
      "country": "Cambodia",
      "currency_code": "KHR"
    },
    {
      "country": "Cameroon",
      "currency_code": "XAF"
    },
    {
      "country": "Canada",
      "currency_code": "CAD"
    },
    {
      "country": "Cape Verde",
      "currency_code": "CVE"
    },
    {
      "country": "Cayman Islands",
      "currency_code": "KYD"
    },
    {
      "country": "Central African Republic",
      "currency_code": "XAF"
    },
    {
      "country": "Chad",
      "currency_code": "XAF"
    },
    {
      "country": "Chile",
      "currency_code": "CLP"
    },
    {
      "country": "China",
      "currency_code": "CNY"
    },
    {
      "country": "Christmas Island",
      "currency_code": "AUD"
    },
    {
      "country": "Cocos (Keeling) Islands",
      "currency_code": "AUD"
    },
    {
      "country": "Colombia",
      "currency_code": "COP"
    },
    {
      "country": "Comoros",
      "currency_code": "KMF"
    },
    {
      "country": "Congo",
      "currency_code": "XAF"
    },
    {
      "country": "Cook Islands",
      "currency_code": "NZD"
    },
    {
      "country": "Costa Rica",
      "currency_code": "CRC"
    },
    {
      "country": "Croatia",
      "currency_code": "EUR"
    },
    {
      "country": "Cuba",
      "currency_code": "CUP"
    },
    {
      "country": "Cyprus",
      "currency_code": "EUR"
    },
    {
      "country": "Czech Republic",
      "currency_code": "CZK"
    },
    {
      "country": "Denmark",
      "currency_code": "DKK"
    },
    {
      "country": "Djibouti",
      "currency_code": "DJF"
    },
    {
      "country": "Dominica",
      "currency_code": "XCD"
    },
    {
      "country": "Dominican Republic",
      "currency_code": "DOP"
    },
    {
      "country": "East Timor",
      "currency_code": "USD"
    },
    {
      "country": "Ecuador",
      "currency_code": "ECS"
    },
    {
      "country": "Egypt",
      "currency_code": "EGP"
    },
    {
      "country": "El Salvador",
      "currency_code": "SVC"
    },
    {
      "country": "England",
      "currency_code": "GBP"
    },
    {
      "country": "Equatorial Guinea",
      "currency_code": "XAF"
    },
    {
      "country": "Eritrea",
      "currency_code": "ERN"
    },
    {
      "country": "Estonia",
      "currency_code": "EUR"
    },
    {
      "country": "Eswatini",
      "currency_code": "SZL"
    },
    {
      "country": "Ethiopia",
      "currency_code": "ETB"
    },
    {
      "country": "Falkland Islands",
      "currency_code": "FKP"
    },
    {
      "country": "Faroe Islands",
      "currency_code": "DKK"
    },
    {
      "country": "Fiji Islands",
      "currency_code": "FJD"
    },
    {
      "country": "Finland",
      "currency_code": "EUR"
    },
    {
      "country": "France",
      "currency_code": "EUR"
    },
    {
      "country": "French Guiana",
      "currency_code": "EUR"
    },
    {
      "country": "French Polynesia",
      "currency_code": "XPF"
    },
    {
      "country": "French Southern territories",
      "currency_code": "EUR"
    },
    {
      "country": "Gabon",
      "currency_code": "XAF"
    },
    {
      "country": "Gambia",
      "currency_code": "GMD"
    },
    {
      "country": "Georgia",
      "currency_code": "GEL"
    },
    {
      "country": "Germany",
      "currency_code": "EUR"
    },
    {
      "country": "Ghana",
      "currency_code": "GHS"
    },
    {
      "country": "Gibraltar",
      "currency_code": "GIP"
    },
    {
      "country": "Greece",
      "currency_code": "EUR"
    },
    {
      "country": "Greenland",
      "currency_code": "DKK"
    },
    {
      "country": "Grenada",
      "currency_code": "XCD"
    },
    {
      "country": "Guadeloupe",
      "currency_code": "EUR"
    },
    {
      "country": "Guam",
      "currency_code": "USD"
    },
    {
      "country": "Guatemala",
      "currency_code": "QTQ"
    },
    {
      "country": "Guinea",
      "currency_code": "GNF"
    },
    {
      "country": "Guinea-Bissau",
      "currency_code": "CFA"
    },
    {
      "country": "Guyana",
      "currency_code": "GYD"
    },
    {
      "country": "Haiti",
      "currency_code": "HTG"
    },
    {
      "country": "Heard Island and McDonald Islands",
      "currency_code": "AUD"
    },
    {
      "country": "Holy See (Vatican City State)",
      "currency_code": "EUR"
    },
    {
      "country": "Honduras",
      "currency_code": "HNL"
    },
    {
      "country": "Hong Kong",
      "currency_code": "HKD"
    },
    {
      "country": "Hungary",
      "currency_code": "HUF"
    },
    {
      "country": "Iceland",
      "currency_code": "ISK"
    },
    {
      "country": "India",
      "currency_code": "INR"
    },
    {
      "country": "Indonesia",
      "currency_code": "IDR"
    },
    {
      "country": "Iran",
      "currency_code": "IRR"
    },
    {
      "country": "Iraq",
      "currency_code": "IQD"
    },
    {
      "country": "Ireland",
      "currency_code": "EUR"
    },
    {
      "country": "Israel",
      "currency_code": "ILS"
    },
    {
      "country": "Italy",
      "currency_code": "EUR"
    },
    {
      "country": "Ivory Coast",
      "currency_code": "XOF"
    },
    {
      "country": "Jamaica",
      "currency_code": "JMD"
    },
    {
      "country": "Japan",
      "currency_code": "JPY"
    },
    {
      "country": "Jordan",
      "currency_code": "JOD"
    },
    {
      "country": "Kazakhstan",
      "currency_code": "KZT"
    },
    {
      "country": "Kenya",
      "currency_code": "KES"
    },
    {
      "country": "Kiribati",
      "currency_code": "AUD"
    },
    {
      "country": "Kuwait",
      "currency_code": "KWD"
    },
    {
      "country": "Kyrgyzstan",
      "currency_code": "KGS"
    },
    {
      "country": "Laos",
      "currency_code": "LAK"
    },
    {
      "country": "Latvia",
      "currency_code": "EUR"
    },
    {
      "country": "Lebanon",
      "currency_code": "LBP"
    },
    {
      "country": "Lesotho",
      "currency_code": "LSL"
    },
    {
      "country": "Liberia",
      "currency_code": "LRD"
    },
    {
      "country": "Libya",
      "currency_code": "LYD"
    },
    {
      "country": "Liechtenstein",
      "currency_code": "CHF"
    },
    {
      "country": "Lithuania",
      "currency_code": "EUR"
    },
    {
      "country": "Luxembourg",
      "currency_code": "EUR"
    },
    {
      "country": "Macau",
      "currency_code": "MOP"
    },
    {
      "country": "North Macedonia",
      "currency_code": "MKD"
    },
    {
      "country": "Madagascar",
      "currency_code": "MGF"
    },
    {
      "country": "Malawi",
      "currency_code": "MWK"
    },
    {
      "country": "Malaysia",
      "currency_code": "MYR"
    },
    {
      "country": "Maldives",
      "currency_code": "MVR"
    },
    {
      "country": "Mali",
      "currency_code": "XOF"
    },
    {
      "country": "Malta",
      "currency_code": "EUR"
    },
    {
      "country": "Marshall Islands",
      "currency_code": "USD"
    },
    {
      "country": "Martinique",
      "currency_code": "EUR"
    },
    {
      "country": "Mauritania",
      "currency_code": "MRO"
    },
    {
      "country": "Mauritius",
      "currency_code": "MUR"
    },
    {
      "country": "Mayotte",
      "currency_code": "EUR"
    },
    {
      "country": "Mexico",
      "currency_code": "MXN"
    },
    {
      "country": "Micronesia, Federated States of",
      "currency_code": "USD"
    },
    {
      "country": "Moldova",
      "currency_code": "MDL"
    },
    {
      "country": "Monaco",
      "currency_code": "EUR"
    },
    {
      "country": "Mongolia",
      "currency_code": "MNT"
    },
    {
      "country": "Montserrat",
      "currency_code": "XCD"
    },
    {
      "country": "Morocco",
      "currency_code": "MAD"
    },
    {
      "country": "Mozambique",
      "currency_code": "MZN"
    },
    {
      "country": "Myanmar",
      "currency_code": "MMR"
    },
    {
      "country": "Namibia",
      "currency_code": "NAD"
    },
    {
      "country": "Nauru",
      "currency_code": "AUD"
    },
    {
      "country": "Nepal",
      "currency_code": "NPR"
    },
    {
      "country": "Netherlands",
      "currency_code": "EUR"
    },
    {
      "country": "Netherlands Antilles",
      "currency_code": "ANG"
    },
    {
      "country": "New Caledonia",
      "currency_code": "XPF"
    },
    {
      "country": "New Zealand",
      "currency_code": "NZD"
    },
    {
      "country": "Nicaragua",
      "currency_code": "NIO"
    },
    {
      "country": "Niger",
      "currency_code": "XOF"
    },
    {
      "country": "Nigeria",
      "currency_code": "NGN"
    },
    {
      "country": "Niue",
      "currency_code": "NZD"
    },
    {
      "country": "Norfolk Island",
      "currency_code": "AUD"
    },
    {
      "country": "North Korea",
      "currency_code": "KPW"
    },
    {
      "country": "Northern Ireland",
      "currency_code": "GBP"
    },
    {
      "country": "Northern Mariana Islands",
      "currency_code": "USD"
    },
    {
      "country": "Norway",
      "currency_code": "NOK"
    },
    {
      "country": "Oman",
      "currency_code": "OMR"
    },
    {
      "country": "Pakistan",
      "currency_code": "PKR"
    },
    {
      "country": "Palau",
      "currency_code": "USD"
    },
    {
      "country": "Palestine",
      "currency_code": null
    },
    {
      "country": "Panama",
      "currency_code": "PAB"
    },
    {
      "country": "Papua New Guinea",
      "currency_code": "PGK"
    },
    {
      "country": "Paraguay",
      "currency_code": "PYG"
    },
    {
      "country": "Peru",
      "currency_code": "PEN"
    },
    {
      "country": "Philippines",
      "currency_code": "PHP"
    },
    {
      "country": "Pitcairn Islands",
      "currency_code": "NZD"
    },
    {
      "country": "Poland",
      "currency_code": "PLN"
    },
    {
      "country": "Portugal",
      "currency_code": "EUR"
    },
    {
      "country": "Puerto Rico",
      "currency_code": "USD"
    },
    {
      "country": "Qatar",
      "currency_code": "QAR"
    },
    {
      "country": "Reunion",
      "currency_code": "EUR"
    },
    {
      "country": "Romania",
      "currency_code": "RON"
    },
    {
      "country": "Russia",
      "currency_code": "RUB"
    },
    {
      "country": "Rwanda",
      "currency_code": "RWF"
    },
    {
      "country": "Saint Helena",
      "currency_code": "SHP"
    },
    {
      "country": "Saint Kitts and Nevis",
      "currency_code": "XCD"
    },
    {
      "country": "Saint Lucia",
      "currency_code": "XCD"
    },
    {
      "country": "Saint Pierre and Miquelon",
      "currency_code": "EUR"
    },
    {
      "country": "Saint Vincent and the Grenadines",
      "currency_code": "XCD"
    },
    {
      "country": "Samoa",
      "currency_code": "WST"
    },
    {
      "country": "San Marino",
      "currency_code": "EUR"
    },
    {
      "country": "Sao Tome and Principe",
      "currency_code": "STD"
    },
    {
      "country": "Saudi Arabia",
      "currency_code": "SAR"
    },
    {
      "country": "Scotland",
      "currency_code": "GBP"
    },
    {
      "country": "Senegal",
      "currency_code": "XOF"
    },
    {
      "country": "Serbia",
      "currency_code": "RSD"
    },
    {
      "country": "Seychelles",
      "currency_code": "SCR"
    },
    {
      "country": "Sierra Leone",
      "currency_code": "SLL"
    },
    {
      "country": "Singapore",
      "currency_code": "SGD"
    },
    {
      "country": "Slovakia",
      "currency_code": "EUR"
    },
    {
      "country": "Slovenia",
      "currency_code": "EUR"
    },
    {
      "country": "Solomon Islands",
      "currency_code": "SBD"
    },
    {
      "country": "Somalia",
      "currency_code": "SOS"
    },
    {
      "country": "South Africa",
      "currency_code": "ZAR"
    },
    {
      "country": "South Georgia and the South Sandwich Islands",
      "currency_code": "GBP"
    },
    {
      "country": "South Korea",
      "currency_code": "KRW"
    },
    {
      "country": "South Sudan",
      "currency_code": "SSP"
    },
    {
      "country": "Spain",
      "currency_code": "EUR"
    },
    {
      "country": "Sri Lanka",
      "currency_code": "LKR"
    },
    {
      "country": "Sudan",
      "currency_code": "SDG"
    },
    {
      "country": "Suriname",
      "currency_code": "SRD"
    },
    {
      "country": "Svalbard and Jan Mayen",
      "currency_code": "NOK"
    },
    {
      "country": "Sweden",
      "currency_code": "SEK"
    },
    {
      "country": "Switzerland",
      "currency_code": "CHF"
    },
    {
      "country": "Syria",
      "currency_code": "SYP"
    },
    {
      "country": "Tajikistan",
      "currency_code": "TJS"
    },
    {
      "country": "Tanzania",
      "currency_code": "TZS"
    },
    {
      "country": "Thailand",
      "currency_code": "THB"
    },
    {
      "country": "The Democratic Republic of Congo",
      "currency_code": "CDF"
    },
    {
      "country": "Togo",
      "currency_code": "XOF"
    },
    {
      "country": "Tokelau",
      "currency_code": "NZD"
    },
    {
      "country": "Tonga",
      "currency_code": "TOP"
    },
    {
      "country": "Trinidad and Tobago",
      "currency_code": "TTD"
    },
    {
      "country": "Tunisia",
      "currency_code": "TND"
    },
    {
      "country": "Turkey",
      "currency_code": "TRY"
    },
    {
      "country": "Turkmenistan",
      "currency_code": "TMT"
    },
    {
      "country": "Turks and Caicos Islands",
      "currency_code": "USD"
    },
    {
      "country": "Tuvalu",
      "currency_code": "AUD"
    },
    {
      "country": "Uganda",
      "currency_code": "UGX"
    },
    {
      "country": "Ukraine",
      "currency_code": "UAH"
    },
    {
      "country": "United Arab Emirates",
      "currency_code": "AED"
    },
    {
      "country": "United Kingdom",
      "currency_code": "GBP"
    },
    {
      "country": "United States",
      "currency_code": "USD"
    },
    {
      "country": "United States Minor Outlying Islands",
      "currency_code": "USD"
    },
    {
      "country": "Uruguay",
      "currency_code": "UYU"
    },
    {
      "country": "Uzbekistan",
      "currency_code": "UZS"
    },
    {
      "country": "Vanuatu",
      "currency_code": "VUV"
    },
    {
      "country": "Venezuela",
      "currency_code": "VEF"
    },
    {
      "country": "Vietnam",
      "currency_code": "VND"
    },
    {
      "country": "Virgin Islands, British",
      "currency_code": "USD"
    },
    {
      "country": "Virgin Islands, U.S.",
      "currency_code": "USD"
    },
    {
      "country": "Wales",
      "currency_code": "GBP"
    },
    {
      "country": "Wallis and Futuna",
      "currency_code": "XPF"
    },
    {
      "country": "Western Sahara",
      "currency_code": "MAD"
    },
    {
      "country": "Yemen",
      "currency_code": "YER"
    },
    {
      "country": "Zambia",
      "currency_code": "ZMW"
    },
    {
      "country": "Zimbabwe",
      "currency_code": "ZWD"
    }
  ]

  selectedCountryCode: string = "+91";
  selectedCurrencyCode: string = "INR";

  name: string = "";
  whatsappNumber: string = "";
  isLoading: boolean = false;

  error = "";
  verifyOtp: boolean = false;

  otp: string = "";

  constructor(private router: Router, private authService: AuthService, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.error = "";
  }

  signUp() {
    this.isLoading = true;

    if (!this.name || !this.whatsappNumber) {
      // this.error = "Please enter your name and WhatsApp number";
      this.toasterService.notify("Please enter your name and WhatsApp number", 'is-warning');
      this.isLoading = false;
      return;
    }

    // check if number is valid
    let number = this.whatsappNumber.replace(/[^0-9]/g, '');
    if (number.length != 10) {
      // this.error = "Please enter a valid WhatsApp number";
      this.toasterService.notify("Please enter a valid WhatsApp number", 'is-warning');
      this.isLoading = false;
      return;
    }

    this.error = "";


    const phonenumber = this.selectedCountryCode + number;


    this.authService.sendOtp(phonenumber).subscribe({
      next: (res) => {
        this.toasterService.notify("OTP Sent Successfully.", 'is-primary');
        console.log(res);
        this.verifyOtp = true;
      },
      error: (err) => {
        console.log(err);
        // this.error = "Something went wrong. Please try again later";
        this.toasterService.notify("Something went wrong. Please try again later", 'is-danger');
        this.verifyOtp = false;
      }
    });

    this.isLoading = false;
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }

  verifyOtpCall() {

    if (this.otp.length != 6) {
      // this.error = "Invalid OTP Format. Please provide correct 6-digit OTP";
      this.toasterService.notify("Invalid OTP Format. Please provide correct 6-digit OTP", 'is-danger');
      return;
    }

    const phonenumber = this.selectedCountryCode + this.whatsappNumber.replace(/[^0-9]/g, '');

    this.authService.verifyOtp({
      phonenumber,
      code: this.otp,
      currency: this.selectedCurrencyCode,
      name: this.name
    }, true).subscribe({
      next: (res: any) => {
        this.toasterService.notify("You've been registered successfully.", 'is-success');
        console.log(res);
        this.authService.loginUser({
          name: this.name,
          phonenumber,
          currency: this.selectedCurrencyCode
        }, res.token);
        // sleep for 2 seconds and then redirect to dashboard
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);

        if (err.status == 424) {
          // this.error = "Invalid OTP. Please try again";
          this.toasterService.notify("User already exists. Please login to continue", 'is-danger');
          this.router.navigate(['/signin']);
          return;
        }

        // this.error = "Invalid OTP. Please try again";
        this.toasterService.notify("Invalid OTP. Please try again", 'is-danger');
        this.verifyOtp = false;
      }
    });

  }

}
