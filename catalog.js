/**
 * Catalog
 * Lightweight catalog for organizations using myriads of web apps for lost users.
 * Metadatas comme from a CSV file (we use ethercalc as editor)
 * with DublinCore descriptors
 *  
 * external dependencies, cf lib directory :
 * - bootstrap 4.3.1 https://getbootstrap.com/
 * - fuse.js https://fusejs.io/
 * - jsrender https://github.com/BorisMoore/jsrender
 * - jquery 3.4.1 https://jquery.com/
 * - PapaParse 4.6 https://www.papaparse.com/
 * - Popper.js 1 https://popper.js.org/
 * - Javascript-MD5 https://github.com/blueimp/JavaScript-MD5
 */
 
/**
 * describes an application (or anything with an URL)
 * @class
 */
class MD {
    constructor(obj) {
        // 4.1 Title : the name given to the resource.
        // Typically, a Title will be a name by which the resource is formally known.
        this.title = obj.title ? obj.title.trim() : "missing title";

        // 4.2 Subject : The topic of the content of the resource.
        // Typically, a Subject will be expressed as keywords or key phrases or classification codes that describe the topic of the resource. Recommended best practice is to select a value from a controlled vocabulary or formal classification scheme.
        this.subject = [];

        // 4.3 Description : An account of the content of the resource.
        // Description may include but is not limited to: an abstract, table of contents, reference to a graphical representation of content or a free-text account of the content.
        this.description = obj.description ? obj.description.trim() : "missing description";
        
        // 4.4 Type : The nature or genre of the content of the resource.
        // Type includes terms describing general categories, functions, genres, or aggregation levels for content. Recommended best practice is to select a value from a controlled vocabulary (for example, the DCMIType vocabulary ). To describe the physical or digital manifestation of the resource, use the FORMAT element.
        this.type = obj.type ? obj.type.trim() : "missing type"; // unused
        
        // 4.5 Source : A Reference to a resource from which the present resource is derived.
        // The present resource may be derived from the Source resource in whole or part. Recommended best practice is to reference the resource by means of a string or number conforming to a formal identification system.
        this.source = obj.source ? obj.source.trim() : "missing source"; // unused

        // 4.6 A reference to a related resource.
        // Recommended best practice is to reference the resource by means of a string or number conforming to a formal identification system.
        this.relation = obj.relation ? obj.relation.trim() : "missing relation"; // unused

        // 4.7 Coverage : The extent or scope of the content of the resource.
        // Coverage will typically include spatial location (a place name or geographic co-ordinates), temporal period (a period label, date, or date range) or jurisdiction (such as a named administrative entity). Recommended best practice is to select a value from a controlled vocabulary (for example, the Thesaurus of Geographic Names [Getty Thesaurus of Geographic Names, http://www. getty.edu/research/tools/vocabulary/tgn/]). Where appropriate, named places or time periods should be used in preference to numeric identifiers such as sets of co-ordinates or date ranges.
        this.coverage = obj.coverage ? obj.coverage.trim() : "missing coverage"; // unused

        // 4.8 Creator : An entity primarily responsible for making the content of the resource. Examples of a Creator include a person, an organization, or a service.
        // Typically the name of the Creator should be used to indicate the entity.
        this.creator = obj.creator ? obj.creator.trim() : "missing creator"; // unused

        // 4.9 Publisher : The entity responsible for making the resource available. Examples of a Publisher include a person, an organization, or a service.
        // Typically, the name of a Publisher should be used to indicate the entity.
        this.publisher = obj.publisher ? obj.publisher.trim() : "missing publisher";
        
        // 4.10 An entity responsible for making contributions to the content of the resource.
        // Examples of a Contributor include a person, an organization or a service. Typically, the name of a Contributor should be used to indicate the entity.
        this.contributor = obj.contributor ? obj.contributor.trim() : "missing contributor"; // unused
        
        // 4.11 Rights : Information about rights held in and over the resource.
        // Typically a Rights element will contain a rights management statement for the resource, or reference a service providing such information. Rights information often encompasses Intellectual Property Rights (IPR), Copyright, and various Property Rights. If the rights element is absent, no assumptions can be made about the status of these and other rights with respect to the resource.
        this.rights = obj.rights ? obj.rights.trim() : "missing rights"; // unused
        
        // 4.12 Date : A date associated with an event in the life cycle of the resource.
        // Typically, Date will be associated with the creation or availability of the resource. Recommended best practice for encoding the date value is defined in a profile of ISO 8601 [Date and Time Formats, W3C Note, http://www.w3.org/TR/NOTE- datetime] and follows the YYYY-MM-DD format.
        this.date = obj.date ? obj.date.trim() : "missing date"; // unused

        // 4.13 Format : The physical or digital manifestation of the resource.
        // Typically, Format may include the media-type or dimensions of the resource. Examples of dimensions include size and duration. Format may be used to determine the software, hardware or other equipment needed to display or operate the resource.
        this.format = "text/html";
        
        // 4.14 Identifier : An unambiguous reference to the resource within a given context.
        // Recommended best practice is to identify the resource by means of a string or number conforming to a formal identification system. Examples of formal identification systems include the Uniform Resource Identifier (URI) (including the Uniform Resource Locator (URL), the Digital Object Identifier (DOI) and the International Standard Book Number (ISBN).
        this.identifier = obj.identifier ? obj.identifier.trim() : "";

        // 4.15 Language : A language of the intellectual content of the resource.
        // Recommended best practice for the values of the Language element is defined by RFC 3066 [RFC 3066, http://www.ietf.org/rfc/ rfc3066.txt] which, in conjunction with ISO 639 [ISO 639, http://www.oasis- open.org/cover/iso639a.html]), defines two- and three-letter primary language tags with optional subtags. Examples include "en" or "eng" for English, "akk" for Akkadian, and "en-GB" for English used in the United Kingdom.
        this.language = "fr"
        
        // 4.16 Audience : A class of entity for whom the resource is intended or useful.
        // A class of entity may be determined by the creator or the publisher or by a third party.
        this.audience = obj.audience ? obj.audience.trim() : "";
        
        this.why = obj.why;
        this.how = obj.how;
        this.help = obj.help;
        this.specialTags = [];
        
        // internal ID using MD5
        this.id = md5(this.identifier);
                
        // comma separated keywords, prefixed with #
        var subject = this.subject;
        $.each(obj.subject.split(","), function(i, value) {
            subject.push("#" + value.trim().toLowerCase());
        });
    }
    
    /**
     * 
     * appends application in the specified DOM node
     * @param {domElement} box DOM node hosting metadatas display
     * @param {Template} jQuery sRender template
     * @param {Function} action callback function
     */
    render(box, template) {
        var mdNode = template.render(this);
        box.append(mdNode);
        return mdNode;
    }
}


/**
 * describes a catalog of metadatas
 * @class
 * @param {String} url URL of a CSV ressource
 */
class Catalog {
    constructor(dataURL) {
        // url du CSV
        this.dataURL = dataURL;
        this.mdDict = {};
        this.tagDict = {};
        this.specialTagDict = {};
        this.mdTemplate = $.templates('#mdTemplate');
        this.fuseAll;
        this.currentSearch;
    }
    
    
    init() {
        this.importCSV();
        this.initGUI();
    }
    

    initGUI() {
        var that = this;
        
        $('#formSearch').submit(function(event) {
            var q = event.target.search.value;
            that.search(q);
            event.preventDefault();
        });
        
        $('.cat-searchReset').click(function(event) {
            that.renderMds();
        });
    }

    
    /**
     * triggers when all apps are registered
     */
    loaded() {
        var result;
        
        // indexing apps with some (not all) weighted attributes
        // fuseAll.search returns an array of app IDs
        this.fuseAll = new Fuse(Object.values(this.mdDict), {
            id: 'id',
            threshold: 0.2,
            minMatchCharLength: 2,
            tokenize: true,
            shouldSort: true,
            distance: 0,
            maxPatternLength: 32,
            keys: [{
                name: 'title',
                weight: 0.7
            }, {
                name: 'publisher',
                weight: 0.7
            }, {
                name: 'description',
                weight: 0.2
            }, {
                name: 'subject',
                weight: 1.0
            }]
        });
        
        // render page
        this.renderMds();
    }
    

    /**
     * parses CSV and on the fly populates mdDict
     */
    importCSV() {
        var that = this;
        
        Papa.parse(this.dataURL, {
                delimiter: ",",
                quoteChar: '"',
                escapechar: '"',
                header: true,
                dynamicTyping: true,
                encoding: 'UTF-8',
                step: function(row) {
                    that.addMD(row.data[0]);
                },
                complete: function() {
                    that.loaded();
                },
                error: function() {
                    console.log("failed to load CSV");
                }, 
                download: true,
                skipEmptyLines: true,  
            }
        );
    }
    
    
    
    /**
     * Registers a tag
     * @param {String} tag
     * @return {String} tag
     */
    addTag(tag) {
        if (this.tagDict.hasOwnProperty(tag)&&tag!="#") {
            this.tagDict[tag].n = this.tagDict[tag].n + 1;
        }
        else {
            this.tagDict[tag] = { 
                category: "subject",
                n: 1
            };
        }
    }


    /**
     * Perform QA checks and if OK appends app to mdDict
     * @param {Object} data CSV row
     * @return {MD} metadata object
     */
    addMD(data) {
        var md,
            that = this;

        if (data.identifier) {
            md = new MD(data);
            this.mdDict[md.id] = md;
            $.each(md.subject, function(i, v) {
                that.addTag(v);
            });
        }
        return md;
    }


    /**
    * displays metadatas
    * @param {Array} IDList list of app ids
    */
    renderMds(IDList) {
        var mdListNode = $('#mdList'),
            mdsFiltered,
            that = this;

        // list of ids
        if (IDList) {
            mdsFiltered = IDList.map(key => this.mdDict[key]);
        }
        else {
            // to array to sort results
            mdsFiltered = Object.keys(this.mdDict).map(key => this.mdDict[key]);
            mdsFiltered.sort(function (e1, e2) {
                var f1 = e1.title.toLowerCase();
                var f2 = e2.title.toLowerCase();
                return ((f1 < f2) ? -1: ((f1 > f2 ? 1: 0)));
            });
        }

        // fill search form with current search
        $('.cat-searchinput').val(this.currentSearch);

        
        // refresh app list
        mdListNode.empty();
        $.each(mdsFiltered, function (k, md) {
            md.render(mdListNode, that.mdTemplate);
        });
        
        // search by clicking on tag
        // TODO : how to bind events in the previous each loop...
        $('a.cat-mdsearchtag').click(function(event) {
            that.search(event.target.text);
            event.preventDefault();
        });

        // updates tags
        this.renderTags();
        
        // display search count
        $('#searchCount').text(
            (IDList) ? IDList.length : Object.keys(this.mdDict).length
        );
    }


    /**
    * displays tag list
    */
    renderTags() {
        var that = this;
        var box = $('#tagList');
        var tags = [];
        box.empty();
        // sort tags alpha
        tags = Object.keys(this.tagDict);
        tags.sort();
        // highlight tag when used as search key
        $.each(tags, function(i, value) {
            $('<a href="#" class="badge .ml-1 md-searchtag">')
                .addClass(
                    (that.currentSearch === value) ? 'badge-primary' : 'badge-light'
                )
                .text(value)
                .click(function(event) {
                    that.search(value);
                    event.preventDefault();
            }).appendTo(box);
        });
    }

    
    /**
     * fulltext search for apps in the Catalog
     * @param {String} s text to search
     * @return {Array} array of map IDs
     */
    search(s) {
        var results;

        if (s) {
            this.currentSearch = s.trim();
            results = this.fuseAll.search(this.currentSearch);
            this.renderMds(results);
        }
        else {
            this.currentSearch = "";
            this.renderMds();
        }        
        return results;
    }
}


// main
var myCatalog;
$(document).ready(function() {
    // loads config from config.json
    $.ajax({
        url: 'config.json',
        cache: false,
        dataType: 'json',
        success: function(config) {
            myCatalog = new Catalog(config.dataURLs[0]);
            $('.cat-title').text(config.title);
            document.title = config.title;
            myCatalog.specialTagDict = config.specialTags;
            myCatalog.init();
        }
    });
});