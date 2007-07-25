# register shortcuts.js as a default include
ActionView::Helpers::AssetTagHelper::register_javascript_include_default('shortcuts')
ActionView::Base.send(:include, ShortcutsHelper)