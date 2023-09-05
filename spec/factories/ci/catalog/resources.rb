# frozen_string_literal: true

FactoryBot.define do
  factory :ci_catalog_resource, class: 'Ci::Catalog::Resource' do
    project factory: :project
  end
end
