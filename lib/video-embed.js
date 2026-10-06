export function videoEmbed(value, autoplay = false, loop = false) {
  if (!value) return null;
  const url = new URL(value);
  if (url.protocol !== "https:") throw new Error("Use an HTTPS Vimeo or YouTube video link.");
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const parts = url.pathname.split("/").filter(Boolean);
  let id;
  if (["youtube.com", "m.youtube.com", "youtube-nocookie.com", "youtu.be"].includes(host)) {
    id = host === "youtu.be" ? parts[0] :
      parts[0] === "watch" ? url.searchParams.get("v") :
      ["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : null;
    if (!/^[A-Za-z0-9_-]{11}$/.test(id || "")) throw new Error("Use a YouTube video link with a valid video ID.");
    return { src: "https://www.youtube-nocookie.com/embed/" + id, provider: "YouTube", url: url.href };
  }
  if (["vimeo.com", "player.vimeo.com"].includes(host)) {
    id = host === "player.vimeo.com" && parts[0] === "video" ? parts[1] : parts[0];
    if (!/^\d+$/.test(id || "")) throw new Error("Use a Vimeo video link with a numeric video ID.");
    const embed = new URL("https://player.vimeo.com/video/" + id);
    const hash = url.searchParams.get("h") || (host === "vimeo.com" ? parts[1] : null);
    if (hash) {
      if (!/^[a-zA-Z0-9]+$/.test(hash)) throw new Error("Invalid Vimeo unlisted video hash.");
      embed.searchParams.set("h", hash);
    }
    if (autoplay === true) {
      embed.searchParams.set("autoplay", "1");
      embed.searchParams.set("muted", "1");
      embed.searchParams.set("playsinline", "1");
    }
    if (loop === true) embed.searchParams.set("loop", "1");
    return { src: embed.href, provider: "Vimeo", url: url.href };
  }
  throw new Error("Video links must be from Vimeo or YouTube.");
}
