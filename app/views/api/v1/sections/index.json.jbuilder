json.array! @sections do |section|
    json.partial! "api/v1/resource", resource: section
    json.set! :links do
        json.set! :self, url_for(request.original_url + section.id.to_s)
    end
    json.set! :relationships do
        json.set! "questions" do
            json.array! section.questions do |questions|
                json.type questions.class.name.underscore.pluralize
                json.id questions.id
                json.attributes questions.attributes
                json.set! :relationships do
                    json.set! "answers" do
                        json.array! questions.answers do |answers|
                            json.type answers.class.name.underscore.pluralize
                            json.id answers.id
                            json.attributes answers.attributes
                        end
                    end
                end
            end
        end
    end
end