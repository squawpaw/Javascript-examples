﻿
// /////////////////////////////////////////////////////////////////////////////////////////////////
//  AUTO OVERWRITES FILES WITH SAME NAME IN THE SAME LOCATION.

// #target illustrator

function outlineDocText(  ) {  
  
         if ( app.documents.length == 0 ) return;
    
  var docRef = app.activeDocument;  

  recurseLayers( docRef.layers );
}; 

function recurseLayers( objArray ) {
    
          for ( var i = 0; i < objArray.length; i++ ) {  
        
                    // Record previous value with conditional change  
                    var l = objArray[i].locked;  
                    if ( l ) objArray[i].locked = false;
    
                    // Record previous value with conditional change  
                    var v = objArray[i].visible;                    
                    if(!v) objArray[i].visible = true;

                    // Recurse the contained layer collection  
                    if ( objArray[i].layers.length > 0 ) {  
                              recurseLayers( objArray[i].layers )  
                    }  
    
                    // Recurse the contained group collection  
                    if ( objArray[i].groupItems.length > 0 ) {  
                              recurseGroups( objArray[i].groupItems )  
                    }   
                
                outlineText( objArray[i].textFrames );
        
                    // Return to previous values  
                    objArray[i].locked = l;  
                    objArray[i].visible = v;
          }  
};  
  
function recurseGroups( objArray ) {  
    
          for ( var i = 0; i < objArray.length; i++ ) {  
    
                    // Record previous value with conditional change  
                    var ll = objArray[i].locked;
                    if ( ll ){ objArray[i].locked = false };
    
                    // Record previous value with conditional change  
                    var h = objArray[i].hidden;  
                    if ( h ) objArray[i].hidden = false;  
    
                    outlineText( objArray[i].textFrames );  
    
                    // Recurse the contained group collection  
                    if ( objArray[i].groupItems.length > 0 ) {  
                              recurseGroups( objArray[i].groupItems )  
                    }   
    
                    // Return to previous values  
                    objArray[i].locked = ll;  
                    objArray[i].hidden = h;  
          }  
};  
  
  
function outlineText( objArray ) {  
          // Reverse this loop as it brakes the indexing  
          for ( var i = objArray.length-1; i >= 0; i-- ) {
                    // Record previous value with conditional change  
                    var l = objArray[i].locked;  
                    if ( l ) objArray[i].locked = false;  
    
                    // Record previous value with conditional change  
                    var h = objArray[i].hidden;  
                    if ( h ) objArray[i].hidden = false;  
    
                    var g = objArray[i].createOutline();  
    
                    // Return new group to previous Text Frame values  
                    g.locked = l;
                    g.hidden = h;
    
          }  
  
}


function cleanup(objArray){
        for (var ls = 0; ls < objArray.length; ls++){      
            if (objArray[ls].visible == false){
                objArray[ls].visible = true;
                objArray[ls].locked = false;
                objArray[ls].remove();
                }
            else continue;
            }
    }


function saveAW( ){
     var workingDoc = app.activeDocument;
     var workingDocFile = workingDoc.fullName;

// Save as PDF
    var highResOpts = new PDFSaveOptions(generateThumbnails = true);
     highResOpts.preserveEditability = false;
     var highResFile = new File(workingDocFile.toString().replace(".ai","_OL.pdf"));
     workingDoc.saveAs(highResFile,highResOpts);
     
// Save as EPS     
     var epsOpts = new EPSSaveOptions();
     epsOpts.compatibility = Compatibility.ILLUSTRATOR10; 
     var epsExport = new File(workingDocFile.toString().replace(".ai", "_OL.eps"));
     workingDoc.saveAs(epsExport, epsOpts);
     };
 
 
 
var workingDocFile = app.activeDocument.fullName;
cleanup(app.activeDocument.layers);
outlineDocText();
saveAW();


// Re-open the AI file to continue work or as final review
   //  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
     var optRef = new OpenOptions();
     var docRef = open(workingDocFile, null, optRef);