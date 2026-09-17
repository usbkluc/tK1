const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    const customerName = String(body.customerName ?? "").trim();
    const customerSurname = String(body.customerSurname ?? "").trim();
    const serviceName = String(body.serviceName ?? "").trim();
    const categoryName = String(body.categoryName ?? "").trim();
    const description = String(body.description ?? "").trim();
    const speed = String(body.speed ?? "normal").trim();
    const material = String(body.material ?? "").trim();
    const proposedPrice = String(body.proposedPrice ?? "").trim();
    const answers = body.answers as Record<string, string> | undefined;
    const files = body.files as string[] | undefined;

    if (!customerName || !customerSurname) {
      return new Response(JSON.stringify({ error: "Meno a priezvisko sú povinné" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const webhookUrl = Deno.env.get("discord");

    if (!webhookUrl) {
      return new Response(JSON.stringify({ error: "Discord webhook nie je nastavený" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const speedLabels: Record<string, string> = {
      normal: "Normálne",
      fast: "Rýchlejšie",
      express: "Expres",
      priority: "Prioritne",
    };

    const materialLabels: Record<string, string> = {
      self: "Mám vlastný",
      needed: "Potrebujem",
      unknown: "Neviem",
    };

    const fields: { name: string; value: string; inline?: boolean }[] = [
      { name: "Meno", value: `${customerName} ${customerSurname}`, inline: true },
      { name: "Kategória", value: categoryName, inline: true },
      { name: "Služba", value: serviceName, inline: true },
      { name: "Rýchlosť", value: speedLabels[speed] ?? speed, inline: true },
    ];

    if (material) {
      fields.push({ name: "Materiál", value: materialLabels[material] ?? material, inline: true });
    }

    if (proposedPrice) {
      fields.push({ name: "Navrhovaná cena", value: `${proposedPrice} €`, inline: true });
    }

    if (answers && typeof answers === "object") {
      const answerLines: string[] = [];
      for (const [key, value] of Object.entries(answers)) {
        if (value && String(value).trim()) {
          answerLines.push(`• ${key}: ${value}`);
        }
      }
      if (answerLines.length > 0) {
        fields.push({ name: "Detaily", value: answerLines.join("\n") });
      }
    }

    if (description) {
      fields.push({ name: "Popis", value: description.slice(0, 1024) });
    }

    if (files && Array.isArray(files) && files.length > 0) {
      fields.push({ name: "Priložené súbory", value: files.join(", ") });
    }

    const payload = {
      embeds: [
        {
          title: "Nová požiadavka — TK1",
          color: 0x25D366,
          fields,
          footer: { text: "TK1 servisný projekt" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      const errText = await discordRes.text();
      return new Response(
        JSON.stringify({ error: `Discord chyba: ${discordRes.status} ${errText}` }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message ?? "Neznáma chyba" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
