module.exports = function(grunt) {
	var pathJade = "app/jade/array/list.json";
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		loc : {
			root	: 'app',
			markup 	: '<%= loc.root %>/markup',
			css 	: '<%= loc.root %>/css',
			js 		: '<%= loc.root %>/js',
			jade 	: '<%= loc.root %>/jade',
			minCss 	: '<%= loc.css %>/min.all.css'
		},
		less : {
			options : {
				//sourceMap : true,
				//sourceMapFilename : '<%= loc.mapCss %>',
				//sourceMapBasepath : '<%= loc.css %>',
				//compress : true
				cleancss : true
			},
			all : {
				//src  : '<%= loc.css %>/index.less',
				src  : '<%= loc.css %>/index.less',
				dest : '<%= loc.minCss %>'
			}
		},
		jade : {
			compile: {
				options:{
					pretty: true,
					client: false,
					data: grunt.file.readJSON(pathJade)
				},
				files: [ {
				  src: "**/*.jade",
				  dest: "<%= loc.markup %>",
				  cwd: "<%= loc.jade %>/temp",
				  expand: true,
				  ext: ".html"
				} ]
			}
		},
		watch : {
			scripts : {
				files : [
							'Gruntfile.js',
							'<%= loc.jade %>/**/*.jade',
							'<%= loc.css %>/**/*.less',
							//Ignore files
							'!<%= loc.minCss %>'
						],
				tasks	: ['run'],
				options	: {
					livereload : {
						port : 35729
					}
				}
			}
		},
		connect : {
			server : {
				options: {
					port : 8080,
					base : '<%= loc.root %>'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');		//convert less files to css
	grunt.loadNpmTasks('grunt-contrib-sass');		//convert less files to css
	grunt.loadNpmTasks('grunt-contrib-watch');		//watching file change
	grunt.loadNpmTasks('grunt-contrib-connect');	//local server run
	grunt.loadNpmTasks('grunt-contrib-jade');	//local jade

	grunt.registerTask('default', ['connect', 'less', 'jade', 'watch']);
	grunt.registerTask('run', ['less', 'jade'] );

};