json.array! @options do |option|
    json.partial! "api/v1/resource", resource: option
end