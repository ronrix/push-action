class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){        
        /*
            Create logic here and run unit testing.
        */
       let string_result = "";

       if(Object.entries(this.working_directory.new_changes).length) {
            string_result = `You have ${Object.entries(this.working_directory.new_changes).length} change/s.`;
        	for(const dir of Object.entries(this.working_directory.new_changes)) {
                string_result += `\n${dir[1].location}/${dir[1].name}`;
            }
       } else {
            string_result = "You have 0 change/s.\n";
       }

       return string_result;
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;
