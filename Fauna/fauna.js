var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var faunaSchema = new Schema(
  {
    gid	       :   {type : Number},
    sl_no      :   {type : Number},
    regn_no 	 :   {type : String},
    regional_c :   {type : String},
    imagefile	 :   {type : Number},
    phylum	   :   {type : String},
    classes		 :   {type : String},
    family		 :   {type : String},
    orders		 :   {type : String},
    genus			 :   {type : String},
    subgenus	 :   {type : String},
    author	   :   {type : String},
    species		 :   {type : String},
    subspecies :   {type : String},
    no_of_exs  :   {type : Number},
    sex			   :   {type : String},
    life_stage :   {type : String},
    body_part	 :   {type : String},
    orientation:   {type : Number},
    locality	 :   {type : String},
    district	 :   {type : String},
    state			 :   {type : String},
    longitude	 :   {type : Number},
    latitude	 :   {type : Number},
    collected	 :   {type : String},
    identified :   {type : String},
    year			 :   {type : Number},
    geom       :   {type : String}
  },{collection : 'finaldata'}
);
module.exports = mongoose.model('fauna',faunaSchema);
