<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the TanStack portfolio and standalone GitHub Pages index.html aligned for requested content and presentation changes; the standalone entry must work without a framework server.
- Store uploaded documents and certificate media as asset pointers; React reads the pointer URLs and the standalone entry uses verified absolute asset URLs to work outside Lovable.
- Download the resume as a fetched Blob with an explicit filename rather than relying on a cross-origin download attribute, which browsers may ignore.
- Visitor Q&A runs through a server-only chat module behind the /api/chat route; keep the AI credential server-side and let the assistant answer only from the portfolio data module.
