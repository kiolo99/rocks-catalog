//data (assume it is a localdatabase) idk PHP :(
const stonesData = [
    { name: "Granodiorite", type: "Igneous", minerals: "Quartz, Orthoclase, Amphibole, Biotite, Muscovite, Plagioclase", grainSize: "Coarse grained (>2mm)", colors: "Black, Grey, White, Green", keywords: "Phanertic, Intrusive, Felsic", imageSrc: "imgs/Gran.jpg" },
    { name: "Shale", type: "Sedimentary", minerals: "Quartz, Clay, Chert, Feldspar", grainSize: "Modstone1/16 to <1/256mm", colors: "Black, Grey, Brown, Red, Green", keywords: "Fissile, Laminated, Clastic", imageSrc: "imgs/Sha.jpg" },
    { name: "Andesite", type: "Igneous", minerals: "Amphibole, Biotite, Plagioclase, Pyroxene, Quartz (minor)", grainSize: "Fine grained (<1mm)", colors: "Light Grey, Dark Grey, Brown", keywords: "Extrusive, Intermediate, Phenocrysts", imageSrc: "imgs/And.jpg" },
    { name: "Granite", type: "Igneous", minerals: "Orthoclase, Amphibole, Biotite, Muscovite, Quartz Plagioclase", grainSize: "Coarse grained (>2mm)", colors: "Black, White, Pink", keywords: "Phanertic, Intrusive, Felsic", imageSrc: "imgs/Gra.jpg" },
    { name: "Siltstone", type: "Sedimentary", minerals: "Clay, Feldspar, Micas", grainSize: "Modstone1/16 to <1/256mm", colors: "Grey, Brown, Red", keywords: "Clastic", imageSrc: "imgs/Sil.jpg" },
    { name: "Sandstone", type: "Sedimentary", minerals: "Any, Quartz", grainSize: "Sandstone2 to 1/16mm", colors: "Any", keywords: "Clastic", imageSrc: "imgs/San.jpg" }
];

//funtions
function fillRocks(rockList){
    document.getElementsByTagName('output')[0].innerHTML = rockList.length;
    document.getElementById('stones-container').innerHTML = '';
    for(i=0; i<rockList.length; i++){
        const section = document.createElement("section");
        section.classList.add("rock-section");

        section.innerHTML = `
            <div class="rock-image"><img src="${rockList[i].imageSrc}" alt="Rock image"></div>
            <div class="rock-info">
                <h3 class="rock-name">${rockList[i].name}</h3>
                <ul>
                    <li>Type: ${rockList[i].type}</li>
                    <li>Minerals: ${rockList[i].minerals}</li>
                    <li>Grain size: ${rockList[i].grainSize}</li>
                    <li>Colors: ${rockList[i].colors}</li>
                    <li>Key Words: ${rockList[i].keywords}</li>
                </ul>
            </div>
        `;

        document.getElementById("stones-container").appendChild(section);
    }
}

function changeNav(){
    if (document.getElementsByTagName('nav')[0].style.marginTop == '16.5px')
        document.getElementsByTagName('nav')[0].style.marginTop = '-330px';
    else if (document.getElementsByTagName('nav')[0].style.marginTop == '-330px'||document.getElementsByTagName('nav')[0].style.marginTop == '')
        document.getElementsByTagName('nav')[0].style.marginTop ='16.5px';
}

function getWidth() { //from JQuery
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

function changeDrop(id, element){
    var options = document.getElementById(id).getElementsByTagName('a');
    var arrow = element.getElementsByClassName('arrow')

    for(i=0; i<options.length;i++){
        console.log(getWidth());
        if (options[i].style.display == 'none' || options[i].style.display == ''){
            if(getWidth() < 975)
                options[i].style.display = 'inline-block';
            else
                options[i].style.display = 'block';
            arrow[0].style.borderLeft = '5px solid transparent';
            arrow[0].style.borderRight = '5px solid transparent';
            arrow[0].style.borderBottom = '0';
            arrow[0].style.borderTop = '5px solid #ffffff';
        }
        else if (options[i].style.display == 'inline-block' || options[i].style.display == 'block'){
            options[i].style.display = 'none';
            arrow[0].style.borderLeft = '0';
            arrow[0].style.borderRight = '5px solid #ffffff';
            arrow[0].style.borderBottom = '5px solid transparent';
            arrow[0].style.borderTop = '5px solid transparent';
        }
    }

}

function filterList(ufList){
    var fList = [];
    for(i=0; i<ufList.length;i++){
        if(ufList[i].style.color == 'rgb(56, 192, 14)')
            if(ufList[i].innerHTML == 'Coarse grained (&gt;2mm)')
                fList.push('Coarse grained (>2mm)');
            else if (ufList[i].innerHTML == 'Fine grained (&lt;1mm)')
                fList.push('Fine grained (<1mm)');
            else if(ufList[i].innerHTML == 'Modstone1/16 to &lt;1/256mm')
                fList.push('Modstone1/16 to <1/256mm');
            else
                fList.push(ufList[i].innerHTML);
    }
    return fList;
}

function search(caller){
    var sname = document.getElementsByTagName('nav')[0].getElementsByTagName('input')[0];
    if(caller){
        if (sname.value == 'Name'){
            sname.value = '';
            sname.size = 1;
        }
        else{
            if (sname.value.length == 0 || sname.value.length == 1)
                sname.size = 1;
            else
                sname.size = (sname.value.length-1);
        }
    }
    var pName = sname.value;
    var pType = filterList(document.getElementById('type').getElementsByTagName('a'));
    var pMinerals = filterList(document.getElementById('minerals').getElementsByTagName('a'));
    var pGrainSize = filterList(document.getElementById('grain-size').getElementsByTagName('a'));
    var pColors = filterList(document.getElementById('colors').getElementsByTagName('a'));
    var pKeywords = filterList(document.getElementById('key-words').getElementsByTagName('a'));
    
    var filteredStonesData = [];
    for(i=0; i<stonesData.length;i++){
        var test = true;
        if(pName == 'Name' || pName == '' || stonesData[i].name.includes(pName)){
            for(ii=0; ii<pType.length;ii++){
                if (!stonesData[i].type.includes(pType[ii]))
                    test = false;
            }
            if(test){
                for(iii=0; iii<pMinerals.length;iii++){
                    if (!stonesData[i].minerals.includes(pMinerals[iii]))
                        test = false;
                }
                if(test){
                    for(iiii=0; iiii<pGrainSize.length;iiii++){
                        if (!stonesData[i].grainSize.includes(pGrainSize[iiii]))
                            test = false;
                    }
                    if(test){
                        for(iiiii=0; iiiii<pColors.length;iiiii++){
                            if (!stonesData[i].colors.includes(pColors[iiiii]))
                                test = false;
                        }
                        if(test){
                            for(iiiiii=0; iiiiii<pKeywords.length;iiiiii++){
                                if (!stonesData[i].keywords.includes(pKeywords[iiiiii]))
                                    test = false;
                            }
                        }
                    }
                }
            }
        }
        else
            test = false;
        if(test)
            filteredStonesData.push(stonesData[i]);
    }
    fillRocks(filteredStonesData);
}

function restartName(){
    var sname = document.getElementsByTagName('nav')[0].getElementsByTagName('input')[0];
    if (sname.value == ''){
        sname.value = 'Name';
        sname.size = 4;
    }
}

function changeColor(element){
    if (element.style.color == 'rgb(255, 255, 255)' || element.style.color == '')
        element.style.color = 'rgb(56, 192, 14)';
    else if (element.style.color == 'rgb(56, 192, 14)')
        element.style.color = 'rgb(255, 255, 255)';
    search(false);
}

function clearFilter(){
    filters = document.getElementsByTagName('a');
    for(i=0; i<filters.length; i++){
        filters[i].style.color = 'rgb(255, 255, 255)';
    }

    sname = document.getElementsByTagName('nav')[0].getElementsByTagName('input')[0];
    sname.value = 'Name';
    sname.size = 4;
    fillRocks(stonesData);
}