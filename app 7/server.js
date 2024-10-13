const path = require("path");
const fastify = require("fastify")({ logger: false });

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// Our home page route
fastify.get("/", function (request, reply) {
  let params = { seo: seo, result: null }; // Add `result` placeholder
  
  // Render the home page without result initially
  return reply.view("/src/pages/index.hbs", params);
});


// Function to predict fraudulent activities

/**
*  Predictor for fraudulent from model/670aa1131b4a7575c6e9bea3
*  Predictive model by BigML - Machine Learning Made Easy
*/
function predictFraudulent(data) {

    var TERM_ANALYSIS = {
        "benefits": {
                "case_sensitive": false,
                "token_mode": 'all',
        },
        "description": {
                "case_sensitive": false,
                "token_mode": 'all',
        },
        "title": {
                "case_sensitive": false,
                "token_mode": 'all',
        },
        "industry": {
                "case_sensitive": false,
                "token_mode": 'all',
        },
        "requirements": {
                "case_sensitive": false,
                "token_mode": 'all',
        },
        "department": {
                "case_sensitive": false,
                "token_mode": 'all',
        },
        "company_profile": {
                "case_sensitive": false,
                "token_mode": 'all',
        },
    }
    var TERM_FORMS = {
        "benefits": {
            "location": ['location', 'locate', 'located', 'locational', 'locations', 'locator'],
            "exciting": ['exciting', 'excited', 'excitement', 'excites'],
            "available": ['available', 'availability', 'availible'],
            "including": ['including', 'include', 'included', 'includes'],
            "customers": ['customers', 'custom', 'customer', "customer's", 'customize', 'customized'],
            "benefits": ['benefits', 'benefit', 'benefiting'],
            "time": ['time', 'timely', 'times', 'timing', 'timings'],
            "salary": ['salary', 'salaried', 'salaries', 'salaris', 'salarys'],
            "sick": ['sick', 'sickness'],
            "compensation": ['compensation', 'compensate', 'compensated', 'compensations'],
        },
                
        "department": {
        },
                
        "requirements": {
            "education": ['education', 'educate', 'educated', 'educating', 'educational', 'educator', 'educators'],
            "flexible": ['flexible', 'flexibility', 'flexibl', 'flexibleability', 'flexibleable', 'flexibly'],
            "help": ['help', 'helped', 'helpful', 'helping', 'helps'],
            "based": ['based', 'base', 'bases', 'basing'],
            "support": ['support', 'supportability', 'supportable', 'supported', 'supporters', 'supporting', 'supportive', 'supports'],
            "position": ['position', 'positing', 'positional', 'positioning', 'positions', 'positive', 'positively', 'positivity'],
            "bachelor": ['bachelor', "bachelor's", 'bachelors'],
            "ability": ['ability', 'abilities'],
            "relationships": ['relationships', 'relationship'],
            "programming": ['programming', 'program', "program's", 'programing', 'programmed', 'programs'],
            "company": ['company', 'companies', "company's", 'companys'],
            "javascript": ['javascript', "javascript's", 'javascriptability', 'javascripting'],
            "implementation": ['implementation', 'implement', 'implementations', 'implemented', 'implementer', 'implementers', 'implementing', 'implements'],
            "field": ['field', 'fielding', 'fields'],
            "office": ['office', 'officeability', 'officeable', 'officer', 'officers', 'offices'],
            "diploma": ['diploma', 'diplomaability', 'diplomas'],
        },
                
        "industry": {
        },
                
        "title": {
            "job": ['job', 'jobs'],
            "clerk": ['clerk', 'clerks'],
            "customer": ['customer', 'custom', 'customers'],
            "controls": ['controls', 'control', 'controller', 'controllers'],
            "position": ['position', 'positions'],
            "professional": ['professional', 'professionals'],
            "network": ['network', 'networking', 'networks'],
            "project": ['project', 'projects'],
            "administrator": ['administrator', 'administration', 'administrative', 'administrators'],
        },
                
        "description": {
            "solutions": ['solutions', 'solution', "solution's", 'solutioning'],
            "drive": ['drive', 'drives', 'driving'],
            "level": ['level', 'leveling', 'levels'],
            "help": ['help', 'helped', 'helpful', 'helpfulness', 'helping', 'helps'],
            "motivated": ['motivated', 'motivate', 'motivates', 'motivating', 'motivation', 'motivational', 'motivations', 'motivator', 'motivators', 'motive', 'motived'],
            "location": ['location', 'locate', 'located', 'locates', 'locating', 'locations'],
            "create": ['create', 'creat', 'created', 'creates', 'creating'],
            "understanding": ['understanding', 'understand', 'understandability', 'understandable', 'understandably', 'understander', 'understandings', 'understands'],
            "growing": ['growing', 'grow', 'grows'],
            "documentation": ['documentation', 'document', 'documentations', 'documented', 'documenting', 'documention', 'documents'],
            "relationships": ['relationships', 'relationship'],
            "opportunity": ['opportunity', 'opportunities'],
            "continued": ['continued', 'continual', 'continually', 'continuation', 'continue', 'continues', 'continuing', 'continuity', 'continuous', 'continuously'],
            "available": ['available', 'availabilities', 'availability', 'availible'],
            "duties": ['duties', 'dutiful', 'duty'],
            "people": ['people', "people's", 'peoples'],
            "projects": ['projects', 'project', "project's", 'projectability', 'projected', 'projecting', 'projection', 'projections'],
        },
                
        "company_profile": {
            "development": ['development', 'develop', 'developed', 'developer', 'developers', 'developing', 'developments', 'develops'],
            "founded": ['founded', 'found', 'founding'],
            "project": ['project', "project's", 'projecting', 'projects'],
            "career": ['career', 'careers'],
            "training": ['training', 'train', 'trained', 'trainings', 'trains'],
            "established": ['established', 'establish', 'establishing', 'establishment', 'establishments'],
            "hiring": ['hiring', 'hire', 'hired', 'hires'],
            "url": ['url', 'urls'],
            "experience": ['experience', 'experiences', 'experiment', 'experimenting'],
            "delivering": ['delivering', 'deliver', 'delivered', 'delivers'],
            "own": ['own', 'owned', 'owning', 'owns'],
            "recruitment": ['recruitment', 'recruit', 'recruited', 'recruiter', 'recruiters', 'recruiting', 'recruitments', 'recruits'],
            "professional": ['professional', 'professionalism', 'professionally', 'professionals'],
            "design": ['design', 'designated', 'designed', 'designer', 'designers', 'designing', 'designs'],
            "continually": ['continually', 'continual', 'continuation', 'continue', 'continued', 'continues', 'continuing', 'continuity', 'continuous', 'continuously'],
        },
                
    }



    var TM_TOKENS = 'tokens_only', TM_FULL_TERM = 'full_terms_only', TM_ALL = 'all';
    var FULL_TERM_PATTERN = new RegExp('^.+\b.+$');

    function termMatches(text, fieldLabel, term) {
      /**
       * Computes term matches depending on the chosen text analysis options
       *
       * @param {string} text Input text
       * @param {string} fieldLabel Name of the field
       * @param {string} term Term to compare
       */

      var options = TERM_ANALYSIS[fieldLabel];
      var fieldTerms = TERM_FORMS[fieldLabel];
      var terms = (typeof fieldTerms[term] === 'undefined') ?
          [term] : fieldTerms[term];
      var tokenMode = options['token_mode'];
      var caseSensitive = options['case_sensitive'];
      var firstTerm = terms[0];
      if (tokenMode === TM_FULL_TERM) {
        return fullTermMatch(text, firstTerm, caseSensitive);
      }
      if (tokenMode === TM_ALL && terms.length == 1) {
        if (firstTerm.match(FULL_TERM_PATTERN)) {
           return fullTermMatch(text, firstTerm, caseSensitive);
        }
      }
      return termMatchesTokens(text, terms, caseSensitive);
    };


    function fullTermMatch(text, fullTerm, caseSensitive) {
      /**
       * Counts the match for full terms according to the caseSensitive option
       *
       * @param {string} text Input text
       * @param {string} fullTerm String to match
       * @param {boolean} caseSensitive Text analysis case_sensitive option
       */

      if (!caseSensitive) {
        text = text.toLowerCase();
        fullTerm = fullTerm.toLowerCase();
      }
      return (text == fullTerm) ? 1 : 0;
    }

    function getTokensFlags(caseSensitive) {
      /**
       * Modifiers for RegExp matching according to case_sensitive option
       *
       * @param {boolean} caseSensitive Text analysis case_sensitive option
       */
      var flags = 'g';
      if (!caseSensitive) {
        flags += 'i';
      }
      return flags;
    }


    function termMatchesTokens(text, terms, caseSensitive) {
      /**
       * Computes term matches depending on the chosen text analysis options
       *
       * @param {string} text Input text
       * @param {array} terms String array of terms to match
       * @param {boolean} caseSensitive Text analysis case_sensitive option
       */

      var flags = getTokensFlags(caseSensitive);
      var terms = terms.join('(\\b|_)|(\\b|_)');
      var pattern = new RegExp('(\\b|_)' + terms + '(\\b|_)', flags);
      var matches = text.match(pattern);
      return (matches == null) ? 0 : matches.length;
    }


    var ITEM_ANALYSIS = {
        "location": {
                "separator": ',',
        },
    }

    var escape = function(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    function itemMatches(text, fieldLabel, item) {
      /**
       * Computes item matches depending on the chosen item analysis options
       *
       * @param {string} text Input text
       * @param {string} fieldLabel Name of the field
       * @param {string} item Item to compare
       */

      var options = ITEM_ANALYSIS[fieldLabel];
      var separator = options.separator;
      var regexp = options.separator_regexp;
      if (typeof(regexp) === 'undefined') {
        if (typeof(separator) === 'undefined') {
          separator = " ";
        }
        regexp = escape(separator);
      }
      
      var pattern = new RegExp(regexp, 'g');
      var inputs = text.split(pattern);
      var counter = 0;
      for (var index = 0; index < inputs.length; index++) {
        if (inputs[index] == item) {
          counter++;
          break;
        }
      }
      return counter;
    };

    if (data.has_company_logo == null) {
        return "0";
    }
    else if (data.has_company_logo=="1") {
        if (data.industry == null) {
            return "0";
        }
        else if (termMatches(data.industry, "industry", "energy") > 0) {
            if (data.company_profile == null) {
                return "0";
            }
            else if (termMatches(data.company_profile, "company_profile", "founded") > 0) {
                return "0";
            }
            else if (termMatches(data.company_profile, "company_profile", "founded") <= 0) {
                if (termMatches(data.company_profile, "company_profile", "url") > 0) {
                    return "1";
                }
                else if (termMatches(data.company_profile, "company_profile", "url") <= 0) {
                    if (termMatches(data.company_profile, "company_profile", "hiring") > 0) {
                        return "1";
                    }
                    else if (termMatches(data.company_profile, "company_profile", "hiring") <= 0) {
                        return "0";
                    }
                }
            }
        }
        else if (termMatches(data.industry, "industry", "energy") <= 0) {
            if (data.location == null) {
                return "0";
            }
            else if (itemMatches(data.location, "location", "San Mateo") > 0) {
                if (data.company_profile == null) {
                    return "1";
                }
                else if (termMatches(data.company_profile, "company_profile", "career") > 0) {
                    return "1";
                }
                else if (termMatches(data.company_profile, "company_profile", "career") <= 0) {
                    return "0";
                }
            }
            else if (itemMatches(data.location, "location", "San Mateo") <= 0) {
                if (data.required_education == null) {
                    return "0";
                }
                else if (data.required_education=="High School or equivalent") {
                    if (data.benefits == null) {
                        return "0";
                    }
                    else if (termMatches(data.benefits, "benefits", "exciting") > 0) {
                        if (termMatches(data.benefits, "benefits", "compensation") > 0) {
                            return "1";
                        }
                        else if (termMatches(data.benefits, "benefits", "compensation") <= 0) {
                            return "0";
                        }
                    }
                    else if (termMatches(data.benefits, "benefits", "exciting") <= 0) {
                        if (itemMatches(data.location, "location", "AUSTIN") > 0) {
                            return "1";
                        }
                        else if (itemMatches(data.location, "location", "AUSTIN") <= 0) {
                            if (data.description == null) {
                                return "0";
                            }
                            else if (termMatches(data.description, "description", "growth") > 0) {
                                return "0";
                            }
                            else if (termMatches(data.description, "description", "growth") <= 0) {
                                if (data.company_profile == null) {
                                    return "0";
                                }
                                else if (termMatches(data.company_profile, "company_profile", "professional") > 0) {
                                    return "0";
                                }
                                else if (termMatches(data.company_profile, "company_profile", "professional") <= 0) {
                                    if (termMatches(data.company_profile, "company_profile", "established") > 0) {
                                        if (termMatches(data.company_profile, "company_profile", "experience") > 0) {
                                            return "1";
                                        }
                                        else if (termMatches(data.company_profile, "company_profile", "experience") <= 0) {
                                            if (itemMatches(data.location, "location", "Cincinnati") > 0) {
                                                return "1";
                                            }
                                            else if (itemMatches(data.location, "location", "Cincinnati") <= 0) {
                                                return "0";
                                            }
                                        }
                                    }
                                    else if (termMatches(data.company_profile, "company_profile", "established") <= 0) {
                                        if (termMatches(data.industry, "industry", "accounting") > 0) {
                                            if (itemMatches(data.location, "location", "8") > 0) {
                                                return "0";
                                            }
                                            else if (itemMatches(data.location, "location", "8") <= 0) {
                                                return "1";
                                            }
                                        }
                                        else if (termMatches(data.industry, "industry", "accounting") <= 0) {
                                            if (data.department == null) {
                                                return "0";
                                            }
                                            else if (termMatches(data.department, "department", "and") > 0) {
                                                return "1";
                                            }
                                            else if (termMatches(data.department, "department", "and") <= 0) {
                                                if (termMatches(data.company_profile, "company_profile", "design") > 0) {
                                                    if (termMatches(data.company_profile, "company_profile", "delivering") > 0) {
                                                        if (termMatches(data.benefits, "benefits", "location") > 0) {
                                                            return "0";
                                                        }
                                                        else if (termMatches(data.benefits, "benefits", "location") <= 0) {
                                                            return "1";
                                                        }
                                                    }
                                                    else if (termMatches(data.company_profile, "company_profile", "delivering") <= 0) {
                                                        return "0";
                                                    }
                                                }
                                                else if (termMatches(data.company_profile, "company_profile", "design") <= 0) {
                                                    if (termMatches(data.benefits, "benefits", "time") > 0) {
                                                        return "0";
                                                    }
                                                    else if (termMatches(data.benefits, "benefits", "time") <= 0) {
                                                        if (data.title == null) {
                                                            return "0";
                                                        }
                                                        else if (termMatches(data.title, "title", "data") > 0) {
                                                            if (data.requirements == null) {
                                                                return "1";
                                                            }
                                                            else if (termMatches(data.requirements, "requirements", "position") > 0) {
                                                                return "0";
                                                            }
                                                            else if (termMatches(data.requirements, "requirements", "position") <= 0) {
                                                                return "1";
                                                            }
                                                        }
                                                        else if (termMatches(data.title, "title", "data") <= 0) {
                                                            if (data.requirements == null) {
                                                                return "0";
                                                            }
                                                            else if (termMatches(data.requirements, "requirements", "bachelor") > 0) {
                                                                if (termMatches(data.description, "description", "opportunity") > 0) {
                                                                    return "0";
                                                                }
                                                                else if (termMatches(data.description, "description", "opportunity") <= 0) {
                                                                    return "1";
                                                                }
                                                            }
                                                            else if (termMatches(data.requirements, "requirements", "bachelor") <= 0) {
                                                                if (itemMatches(data.location, "location", "Jacksonville") > 0) {
                                                                    if (termMatches(data.description, "description", "people") > 0) {
                                                                        return "0";
                                                                    }
                                                                    else if (termMatches(data.description, "description", "people") <= 0) {
                                                                        return "1";
                                                                    }
                                                                }
                                                                else if (itemMatches(data.location, "location", "Jacksonville") <= 0) {
                                                                    if (termMatches(data.title, "title", "team") > 0) {
                                                                        if (termMatches(data.requirements, "requirements", "help") > 0) {
                                                                            return "0";
                                                                        }
                                                                        else if (termMatches(data.requirements, "requirements", "help") <= 0) {
                                                                            return "1";
                                                                        }
                                                                    }
                                                                    else if (termMatches(data.title, "title", "team") <= 0) {
                                                                        if (termMatches(data.department, "department", "sales") > 0) {
                                                                            if (termMatches(data.description, "description", "continued") > 0) {
                                                                                return "1";
                                                                            }
                                                                            else if (termMatches(data.description, "description", "continued") <= 0) {
                                                                                if (termMatches(data.company_profile, "company_profile", "continually") > 0) {
                                                                                    return "1";
                                                                                }
                                                                                else if (termMatches(data.company_profile, "company_profile", "continually") <= 0) {
                                                                                    return "0";
                                                                                }
                                                                            }
                                                                        }
                                                                        else if (termMatches(data.department, "department", "sales") <= 0) {
                                                                            if (termMatches(data.requirements, "requirements", "relationships") > 0) {
                                                                                if (termMatches(data.requirements, "requirements", "position") > 0) {
                                                                                    return "1";
                                                                                }
                                                                                else if (termMatches(data.requirements, "requirements", "position") <= 0) {
                                                                                    return "0";
                                                                                }
                                                                            }
                                                                            else if (termMatches(data.requirements, "requirements", "relationships") <= 0) {
                                                                                if (termMatches(data.title, "title", "home") > 0) {
                                                                                    if (termMatches(data.description, "description", "level") > 0) {
                                                                                        return "1";
                                                                                    }
                                                                                    else if (termMatches(data.description, "description", "level") <= 0) {
                                                                                        return "0";
                                                                                    }
                                                                                }
                                                                                else if (termMatches(data.title, "title", "home") <= 0) {
                                                                                    return "0";
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if (data.required_education!="High School or equivalent") {
                    if (data.company_profile == null) {
                        return "0";
                    }
                    else if (termMatches(data.company_profile, "company_profile", "hiring") > 0) {
                        if (data.benefits == null) {
                            return "0";
                        }
                        else if (termMatches(data.benefits, "benefits", "customers") > 0) {
                            if (termMatches(data.company_profile, "company_profile", "development") > 0) {
                                return "1";
                            }
                            else if (termMatches(data.company_profile, "company_profile", "development") <= 0) {
                                if (data.department == null) {
                                    return "0";
                                }
                                else if (termMatches(data.department, "department", "engineering") > 0) {
                                    return "1";
                                }
                                else if (termMatches(data.department, "department", "engineering") <= 0) {
                                    return "0";
                                }
                            }
                        }
                        else if (termMatches(data.benefits, "benefits", "customers") <= 0) {
                            if (itemMatches(data.location, "location", "San Jose") > 0) {
                                return "1";
                            }
                            else if (itemMatches(data.location, "location", "San Jose") <= 0) {
                                if (data.requirements == null) {
                                    return "0";
                                }
                                else if (termMatches(data.requirements, "requirements", "ms") > 0) {
                                    if (data.department == null) {
                                        return "0";
                                    }
                                    else if (termMatches(data.department, "department", "technology") > 0) {
                                        return "1";
                                    }
                                    else if (termMatches(data.department, "department", "technology") <= 0) {
                                        return "0";
                                    }
                                }
                                else if (termMatches(data.requirements, "requirements", "ms") <= 0) {
                                    if (data.title == null) {
                                        return "0";
                                    }
                                    else if (termMatches(data.title, "title", "professional") > 0) {
                                        return "1";
                                    }
                                    else if (termMatches(data.title, "title", "professional") <= 0) {
                                        if (data.required_education=="Certification") {
                                            if (data.description == null) {
                                                return "0";
                                            }
                                            else if (termMatches(data.description, "description", "opportunity") > 0) {
                                                return "1";
                                            }
                                            else if (termMatches(data.description, "description", "opportunity") <= 0) {
                                                return "0";
                                            }
                                        }
                                        else if (data.required_education!="Certification") {
                                            return "0";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (termMatches(data.company_profile, "company_profile", "hiring") <= 0) {
                        if (termMatches(data.industry, "industry", "biotechnology") > 0) {
                            if (termMatches(data.company_profile, "company_profile", "project") > 0) {
                                return "1";
                            }
                            else if (termMatches(data.company_profile, "company_profile", "project") <= 0) {
                                return "0";
                            }
                        }
                        else if (termMatches(data.industry, "industry", "biotechnology") <= 0) {
                            if (data.title == null) {
                                return "0";
                            }
                            else if (termMatches(data.title, "title", "controls") > 0) {
                                if (data.required_education=="Associate Degree") {
                                    return "1";
                                }
                                else if (data.required_education!="Associate Degree") {
                                    return "0";
                                }
                            }
                            else if (termMatches(data.title, "title", "controls") <= 0) {
                                if (itemMatches(data.location, "location", "TX") > 0) {
                                    if (termMatches(data.company_profile, "company_profile", "own") > 0) {
                                        if (data.requirements == null) {
                                            return "1";
                                        }
                                        else if (termMatches(data.requirements, "requirements", "self") > 0) {
                                            return "0";
                                        }
                                        else if (termMatches(data.requirements, "requirements", "self") <= 0) {
                                            return "1";
                                        }
                                    }
                                    else if (termMatches(data.company_profile, "company_profile", "own") <= 0) {
                                        if (data.requirements == null) {
                                            return "0";
                                        }
                                        else if (termMatches(data.requirements, "requirements", "flexible") > 0) {
                                            if (data.benefits == null) {
                                                return "0";
                                            }
                                            else if (termMatches(data.benefits, "benefits", "compensation") > 0) {
                                                return "1";
                                            }
                                            else if (termMatches(data.benefits, "benefits", "compensation") <= 0) {
                                                return "0";
                                            }
                                        }
                                        else if (termMatches(data.requirements, "requirements", "flexible") <= 0) {
                                            return "0";
                                        }
                                    }
                                }
                                else if (itemMatches(data.location, "location", "TX") <= 0) {
                                    if (itemMatches(data.location, "location", "EAW") > 0) {
                                        return "1";
                                    }
                                    else if (itemMatches(data.location, "location", "EAW") <= 0) {
                                        if (itemMatches(data.location, "location", "Redmond") > 0) {
                                            if (data.description == null) {
                                                return "0";
                                            }
                                            else if (termMatches(data.description, "description", "projects") > 0) {
                                                return "0";
                                            }
                                            else if (termMatches(data.description, "description", "projects") <= 0) {
                                                return "1";
                                            }
                                        }
                                        else if (itemMatches(data.location, "location", "Redmond") <= 0) {
                                            if (data.requirements == null) {
                                                return "0";
                                            }
                                            else if (termMatches(data.requirements, "requirements", "support") > 0) {
                                                if (itemMatches(data.location, "location", "Cincinnati") > 0) {
                                                    return "1";
                                                }
                                                else if (itemMatches(data.location, "location", "Cincinnati") <= 0) {
                                                    if (data.description == null) {
                                                        return "0";
                                                    }
                                                    else if (termMatches(data.description, "description", "motivated") > 0) {
                                                        return "0";
                                                    }
                                                    else if (termMatches(data.description, "description", "motivated") <= 0) {
                                                        return "0";
                                                    }
                                                }
                                            }
                                            else if (termMatches(data.requirements, "requirements", "support") <= 0) {
                                                if (itemMatches(data.location, "location", "Little Rock") > 0) {
                                                    if (data.description == null) {
                                                        return "0";
                                                    }
                                                    else if (termMatches(data.description, "description", "opportunity") > 0) {
                                                        return "1";
                                                    }
                                                    else if (termMatches(data.description, "description", "opportunity") <= 0) {
                                                        return "0";
                                                    }
                                                }
                                                else if (itemMatches(data.location, "location", "Little Rock") <= 0) {
                                                    return "0";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else if (data.has_company_logo=="0") {
        if (data.company_profile == null) {
            return "0";
        }
        else if (termMatches(data.company_profile, "company_profile", "recruitment") > 0) {
            return "0";
        }
        else if (termMatches(data.company_profile, "company_profile", "recruitment") <= 0) {
            if (data.title == null) {
                return "0";
            }
            else if (termMatches(data.title, "title", "data") > 0) {
                if (termMatches(data.title, "title", "entry") > 0) {
                    if (termMatches(data.title, "title", "position") > 0) {
                        return "1";
                    }
                    else if (termMatches(data.title, "title", "position") <= 0) {
                        if (data.benefits == null) {
                            return "1";
                        }
                        else if (termMatches(data.benefits, "benefits", "available") > 0) {
                            return "0";
                        }
                        else if (termMatches(data.benefits, "benefits", "available") <= 0) {
                            if (data.employment_type == null) {
                                return "1";
                            }
                            else if (data.employment_type=="Full-time") {
                                if (termMatches(data.benefits, "benefits", "salary") > 0) {
                                    return "0";
                                }
                                else if (termMatches(data.benefits, "benefits", "salary") <= 0) {
                                    return "1";
                                }
                            }
                            else if (data.employment_type!="Full-time") {
                                if (data.description == null) {
                                    return "0";
                                }
                                else if (termMatches(data.description, "description", "help") > 0) {
                                    return "1";
                                }
                                else if (termMatches(data.description, "description", "help") <= 0) {
                                    if (termMatches(data.benefits, "benefits", "sick") > 0) {
                                        return "1";
                                    }
                                    else if (termMatches(data.benefits, "benefits", "sick") <= 0) {
                                        return "0";
                                    }
                                }
                            }
                        }
                    }
                }
                else if (termMatches(data.title, "title", "entry") <= 0) {
                    if (data.description == null) {
                        return "0";
                    }
                    else if (termMatches(data.description, "description", "opportunity") > 0) {
                        if (termMatches(data.description, "description", "understanding") > 0) {
                            return "0";
                        }
                        else if (termMatches(data.description, "description", "understanding") <= 0) {
                            return "1";
                        }
                    }
                    else if (termMatches(data.description, "description", "opportunity") <= 0) {
                        if (data.requirements == null) {
                            return "0";
                        }
                        else if (termMatches(data.requirements, "requirements", "implementation") > 0) {
                            return "1";
                        }
                        else if (termMatches(data.requirements, "requirements", "implementation") <= 0) {
                            if (termMatches(data.title, "title", "time") > 0) {
                                return "1";
                            }
                            else if (termMatches(data.title, "title", "time") <= 0) {
                                return "0";
                            }
                        }
                    }
                }
            }
            else if (termMatches(data.title, "title", "data") <= 0) {
                if (data.location == null) {
                    return "0";
                }
                else if (itemMatches(data.location, "location", "Houston") > 0) {
                    if (data.industry == null) {
                        return "1";
                    }
                    else if (termMatches(data.industry, "industry", "energy") > 0) {
                        return "1";
                    }
                    else if (termMatches(data.industry, "industry", "energy") <= 0) {
                        if (data.department == null) {
                            return "1";
                        }
                        else if (termMatches(data.department, "department", "engineering") > 0) {
                            return "1";
                        }
                        else if (termMatches(data.department, "department", "engineering") <= 0) {
                            if (data.required_experience == null) {
                                return "0";
                            }
                            else if (data.required_experience=="Entry level") {
                                return "1";
                            }
                            else if (data.required_experience!="Entry level") {
                                return "0";
                            }
                        }
                    }
                }
                else if (itemMatches(data.location, "location", "Houston") <= 0) {
                    if (data.required_education == null) {
                        return "0";
                    }
                    else if (data.required_education=="Bachelor's Degree") {
                        if (data.benefits == null) {
                            return "0";
                        }
                        else if (termMatches(data.benefits, "benefits", "url") > 0) {
                            if (data.requirements == null) {
                                return "0";
                            }
                            else if (termMatches(data.requirements, "requirements", "based") > 0) {
                                return "1";
                            }
                            else if (termMatches(data.requirements, "requirements", "based") <= 0) {
                                return "0";
                            }
                        }
                        else if (termMatches(data.benefits, "benefits", "url") <= 0) {
                            if (data.industry == null) {
                                return "0";
                            }
                            else if (termMatches(data.industry, "industry", "energy") > 0) {
                                if (itemMatches(data.location, "location", "HOUSTON") > 0) {
                                    return "0";
                                }
                                else if (itemMatches(data.location, "location", "HOUSTON") <= 0) {
                                    return "1";
                                }
                            }
                            else if (termMatches(data.industry, "industry", "energy") <= 0) {
                                if (data.description == null) {
                                    return "0";
                                }
                                else if (termMatches(data.description, "description", "location") > 0) {
                                    if (data.employment_type == null) {
                                        return "0";
                                    }
                                    else if (data.employment_type=="Full-time") {
                                        if (termMatches(data.title, "title", "project") > 0) {
                                            return "1";
                                        }
                                        else if (termMatches(data.title, "title", "project") <= 0) {
                                            if (termMatches(data.industry, "industry", "health, wellness and fitness") > 0) {
                                                return "1";
                                            }
                                            else if (termMatches(data.industry, "industry", "health, wellness and fitness") <= 0) {
                                                return "0";
                                            }
                                        }
                                    }
                                    else if (data.employment_type!="Full-time") {
                                        if (termMatches(data.description, "description", "opportunity") > 0) {
                                            return "0";
                                        }
                                        else if (termMatches(data.description, "description", "opportunity") <= 0) {
                                            return "1";
                                        }
                                    }
                                }
                                else if (termMatches(data.description, "description", "location") <= 0) {
                                    if (termMatches(data.industry, "industry", "aviation") > 0) {
                                        return "1";
                                    }
                                    else if (termMatches(data.industry, "industry", "aviation") <= 0) {
                                        if (itemMatches(data.location, "location", "Des Moines") > 0) {
                                            return "1";
                                        }
                                        else if (itemMatches(data.location, "location", "Des Moines") <= 0) {
                                            if (itemMatches(data.location, "location", "jacksonville") > 0) {
                                                return "1";
                                            }
                                            else if (itemMatches(data.location, "location", "jacksonville") <= 0) {
                                                return "0";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (data.required_education!="Bachelor's Degree") {
                        if (data.industry == null) {
                            return "0";
                        }
                        else if (termMatches(data.industry, "industry", "accounting") > 0) {
                            if (data.requirements == null) {
                                return "1";
                            }
                            else if (termMatches(data.requirements, "requirements", "self") > 0) {
                                if (termMatches(data.requirements, "requirements", "office") > 0) {
                                    return "1";
                                }
                                else if (termMatches(data.requirements, "requirements", "office") <= 0) {
                                    return "0";
                                }
                            }
                            else if (termMatches(data.requirements, "requirements", "self") <= 0) {
                                return "1";
                            }
                        }
                        else if (termMatches(data.industry, "industry", "accounting") <= 0) {
                            if (termMatches(data.title, "title", "clerk") > 0) {
                                if (data.description == null) {
                                    return "1";
                                }
                                else if (termMatches(data.description, "description", "level") > 0) {
                                    return "0";
                                }
                                else if (termMatches(data.description, "description", "level") <= 0) {
                                    if (termMatches(data.industry, "industry", "practice") > 0) {
                                        return "0";
                                    }
                                    else if (termMatches(data.industry, "industry", "practice") <= 0) {
                                        return "1";
                                    }
                                }
                            }
                            else if (termMatches(data.title, "title", "clerk") <= 0) {
                                if (termMatches(data.title, "title", "network") > 0) {
                                    if (data.benefits == null) {
                                        return "1";
                                    }
                                    else if (termMatches(data.benefits, "benefits", "location") > 0) {
                                        return "0";
                                    }
                                    else if (termMatches(data.benefits, "benefits", "location") <= 0) {
                                        return "1";
                                    }
                                }
                                else if (termMatches(data.title, "title", "network") <= 0) {
                                    if (data.required_education=="Some High School Coursework") {
                                        return "1";
                                    }
                                    else if (data.required_education!="Some High School Coursework") {
                                        if (itemMatches(data.location, "location", "Los Angeles") > 0) {
                                            if (data.description == null) {
                                                return "1";
                                            }
                                            else if (termMatches(data.description, "description", "drive") > 0) {
                                                return "0";
                                            }
                                            else if (termMatches(data.description, "description", "drive") <= 0) {
                                                if (termMatches(data.description, "description", "amp") > 0) {
                                                    return "0";
                                                }
                                                else if (termMatches(data.description, "description", "amp") <= 0) {
                                                    return "1";
                                                }
                                            }
                                        }
                                        else if (itemMatches(data.location, "location", "Los Angeles") <= 0) {
                                            if (termMatches(data.title, "title", "administrator") > 0) {
                                                if (data.description == null) {
                                                    return "1";
                                                }
                                                else if (termMatches(data.description, "description", "duties") > 0) {
                                                    return "1";
                                                }
                                                else if (termMatches(data.description, "description", "duties") <= 0) {
                                                    if (data.benefits == null) {
                                                        return "0";
                                                    }
                                                    else if (termMatches(data.benefits, "benefits", "including") > 0) {
                                                        return "1";
                                                    }
                                                    else if (termMatches(data.benefits, "benefits", "including") <= 0) {
                                                        if (data.requirements == null) {
                                                            return "0";
                                                        }
                                                        else if (termMatches(data.requirements, "requirements", "programming") > 0) {
                                                            return "1";
                                                        }
                                                        else if (termMatches(data.requirements, "requirements", "programming") <= 0) {
                                                            if (itemMatches(data.location, "location", "london") > 0) {
                                                                return "1";
                                                            }
                                                            else if (itemMatches(data.location, "location", "london") <= 0) {
                                                                return "0";
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else if (termMatches(data.title, "title", "administrator") <= 0) {
                                                if (termMatches(data.title, "title", "customer") > 0) {
                                                    if (data.requirements == null) {
                                                        return "0";
                                                    }
                                                    else if (termMatches(data.requirements, "requirements", "diploma") > 0) {
                                                        if (itemMatches(data.location, "location", "Louisville") > 0) {
                                                            return "0";
                                                        }
                                                        else if (itemMatches(data.location, "location", "Louisville") <= 0) {
                                                            return "1";
                                                        }
                                                    }
                                                    else if (termMatches(data.requirements, "requirements", "diploma") <= 0) {
                                                        if (data.benefits == null) {
                                                            return "0";
                                                        }
                                                        else if (termMatches(data.benefits, "benefits", "benefits") > 0) {
                                                            if (termMatches(data.benefits, "benefits", "including") > 0) {
                                                                return "0";
                                                            }
                                                            else if (termMatches(data.benefits, "benefits", "including") <= 0) {
                                                                return "1";
                                                            }
                                                        }
                                                        else if (termMatches(data.benefits, "benefits", "benefits") <= 0) {
                                                            if (data.required_experience == null) {
                                                                return "0";
                                                            }
                                                            else if (data.required_experience=="Not Applicable") {
                                                                if (data.description == null) {
                                                                    return "0";
                                                                }
                                                                else if (termMatches(data.description, "description", "opportunity") > 0) {
                                                                    return "0";
                                                                }
                                                                else if (termMatches(data.description, "description", "opportunity") <= 0) {
                                                                    return "1";
                                                                }
                                                            }
                                                            else if (data.required_experience!="Not Applicable") {
                                                                return "0";
                                                            }
                                                        }
                                                    }
                                                }
                                                else if (termMatches(data.title, "title", "customer") <= 0) {
                                                    if (data.description == null) {
                                                        return "0";
                                                    }
                                                    else if (termMatches(data.description, "description", "create") > 0) {
                                                        return "0";
                                                    }
                                                    else if (termMatches(data.description, "description", "create") <= 0) {
                                                        if (itemMatches(data.location, "location", "chicago") > 0) {
                                                            return "1";
                                                        }
                                                        else if (itemMatches(data.location, "location", "chicago") <= 0) {
                                                            if (termMatches(data.description, "description", "growing") > 0) {
                                                                return "0";
                                                            }
                                                            else if (termMatches(data.description, "description", "growing") <= 0) {
                                                                if (termMatches(data.description, "description", "relationships") > 0) {
                                                                    return "0";
                                                                }
                                                                else if (termMatches(data.description, "description", "relationships") <= 0) {
                                                                    if (termMatches(data.description, "description", "documentation") > 0) {
                                                                        if (data.requirements == null) {
                                                                            return "0";
                                                                        }
                                                                        else if (termMatches(data.requirements, "requirements", "education") > 0) {
                                                                            return "1";
                                                                        }
                                                                        else if (termMatches(data.requirements, "requirements", "education") <= 0) {
                                                                            if (data.benefits == null) {
                                                                                return "0";
                                                                            }
                                                                            else if (termMatches(data.benefits, "benefits", "compensation") > 0) {
                                                                                return "1";
                                                                            }
                                                                            else if (termMatches(data.benefits, "benefits", "compensation") <= 0) {
                                                                                if (termMatches(data.requirements, "requirements", "field") > 0) {
                                                                                    return "1";
                                                                                }
                                                                                else if (termMatches(data.requirements, "requirements", "field") <= 0) {
                                                                                    return "0";
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    else if (termMatches(data.description, "description", "documentation") <= 0) {
                                                                        if (data.department == null) {
                                                                            return "0";
                                                                        }
                                                                        else if (termMatches(data.department, "department", "admin") > 0) {
                                                                            return "1";
                                                                        }
                                                                        else if (termMatches(data.department, "department", "admin") <= 0) {
                                                                            if (itemMatches(data.location, "location", "Gold coast") > 0) {
                                                                                return "1";
                                                                            }
                                                                            else if (itemMatches(data.location, "location", "Gold coast") <= 0) {
                                                                                if (termMatches(data.description, "description", "solutions") > 0) {
                                                                                    return "0";
                                                                                }
                                                                                else if (termMatches(data.description, "description", "solutions") <= 0) {
                                                                                    if (termMatches(data.title, "title", "job") > 0) {
                                                                                        return "1";
                                                                                    }
                                                                                    else if (termMatches(data.title, "title", "job") <= 0) {
                                                                                        if (data.requirements == null) {
                                                                                            return "0";
                                                                                        }
                                                                                        else if (termMatches(data.requirements, "requirements", "multi") > 0) {
                                                                                            if (termMatches(data.requirements, "requirements", "education") > 0) {
                                                                                                return "0";
                                                                                            }
                                                                                            else if (termMatches(data.requirements, "requirements", "education") <= 0) {
                                                                                                return "1";
                                                                                            }
                                                                                        }
                                                                                        else if (termMatches(data.requirements, "requirements", "multi") <= 0) {
                                                                                            if (termMatches(data.requirements, "requirements", "ability") > 0) {
                                                                                                return "0";
                                                                                            }
                                                                                            else if (termMatches(data.requirements, "requirements", "ability") <= 0) {
                                                                                                if (termMatches(data.company_profile, "company_profile", "training") > 0) {
                                                                                                    return "1";
                                                                                                }
                                                                                                else if (termMatches(data.company_profile, "company_profile", "training") <= 0) {
                                                                                                    if (data.required_experience == null) {
                                                                                                        return "0";
                                                                                                    }
                                                                                                    else if (data.required_experience=="Not Applicable") {
                                                                                                        if (termMatches(data.industry, "industry", "hospital & health care") > 0) {
                                                                                                            return "1";
                                                                                                        }
                                                                                                        else if (termMatches(data.industry, "industry", "hospital & health care") <= 0) {
                                                                                                            if (termMatches(data.requirements, "requirements", "company") > 0) {
                                                                                                                return "1";
                                                                                                            }
                                                                                                            else if (termMatches(data.requirements, "requirements", "company") <= 0) {
                                                                                                                if (termMatches(data.description, "description", "available") > 0) {
                                                                                                                    if (termMatches(data.requirements, "requirements", "able") > 0) {
                                                                                                                        return "0";
                                                                                                                    }
                                                                                                                    else if (termMatches(data.requirements, "requirements", "able") <= 0) {
                                                                                                                        if (termMatches(data.title, "title", "staff") > 0) {
                                                                                                                            return "0";
                                                                                                                        }
                                                                                                                        else if (termMatches(data.title, "title", "staff") <= 0) {
                                                                                                                            return "1";
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                                else if (termMatches(data.description, "description", "available") <= 0) {
                                                                                                                    if (termMatches(data.title, "title", "time") > 0) {
                                                                                                                        return "1";
                                                                                                                    }
                                                                                                                    else if (termMatches(data.title, "title", "time") <= 0) {
                                                                                                                        return "0";
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                    else if (data.required_experience!="Not Applicable") {
                                                                                                        if (termMatches(data.industry, "industry", "design") > 0) {
                                                                                                            if (termMatches(data.requirements, "requirements", "javascript") > 0) {
                                                                                                                return "0";
                                                                                                            }
                                                                                                            else if (termMatches(data.requirements, "requirements", "javascript") <= 0) {
                                                                                                                return "1";
                                                                                                            }
                                                                                                        }
                                                                                                        else if (termMatches(data.industry, "industry", "design") <= 0) {
                                                                                                            if (termMatches(data.industry, "industry", "broadcast media") > 0) {
                                                                                                                return "1";
                                                                                                            }
                                                                                                            else if (termMatches(data.industry, "industry", "broadcast media") <= 0) {
                                                                                                                if (itemMatches(data.location, "location", "ABE") > 0) {
                                                                                                                    return "1";
                                                                                                                }
                                                                                                                else if (itemMatches(data.location, "location", "ABE") <= 0) {
                                                                                                                    return "0";
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}

// POST route to handle predictions
fastify.post("/predict", function (request, reply) {
  const data = request.body;

  // Call the prediction function
  const result = predictFraudulent(data);

  // Map 0 to "No Bias Detected" and 1 to "Bias Detected"
  const predictionMessage = result === 1 ? "Bias Detected" : "No Bias Detected";

  // Send the result as JSON
  return reply.send({ prediction: predictionMessage });
});



// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
