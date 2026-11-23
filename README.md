# Chat Archive

Controls website access to retained chats in each scope. Administrators choose whether /chatarchive offers a link to the selected chat and whether members receive a private website notice. Enable Integration Manager and Chat Archive in the managed scope.

WABP captures, searches and exports conversations. This plugin supplies the per-scope website policy to WABP through Integration Manager. The private `/chatarchive` menu can offer a link to the selected chat, and the website verifies access when opened. Archive Courier uses the same export service to deliver files.

Set **Website notice text** here to customize the private notice for this scope. An empty value inherits the existing scope template or the account default. Notices support `{archiveUrl}`, `{scopeName}` and `{userDisplayName}`.

Run `npm ci` and `npm test` to verify this package. The release workflow builds and checks its immutable WABS archive.
