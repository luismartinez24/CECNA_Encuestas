json.array! @questions do |question|
    json.partial! "api/v1/resource", resource: question
end