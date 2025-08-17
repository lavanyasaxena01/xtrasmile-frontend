import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Heart,
  MapPin,
  Phone,
  Truck,
  Utensils,
  Building2,
  ShieldCheck,
  Gauge,
  Search,
  Camera,
  Upload,
  Bell,
  Leaf,
  Trophy,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// ---------------------------------------------
// Mock Data
// ---------------------------------------------
const seedHotels = [
  {
    id: 1,
    name: "Hotel Nirvana",
    contact: "+91 98765 43210",
    address: "Connaught Place, New Delhi",
    surplus: [
      { id: "a1", item: "Veg Biryani", qty: 30, bestBeforeHrs: 4 },
      { id: "a2", item: "Tandoori Roti", qty: 50, bestBeforeHrs: 6 },
    ],
  },
  {
    id: 2,
    name: "Blue Leaf Banquets",
    contact: "+91 91234 56780",
    address: "Baner, Pune",
    surplus: [{ id: "b1", item: "Dal Makhani", qty: 20, bestBeforeHrs: 5 }],
  },
];

const seedNGOs = [
  {
    id: 1,
    name: "Helping Hands Foundation",
    contact: "+91 98111 22233",
    address: "Lajpat Nagar, New Delhi",
    capacity: 120,
    accepted: [],
  },
  {
    id: 2,
    name: "Robin Hood Army",
    contact: "+91 99887 76655",
    address: "Kothrud, Pune",
    capacity: 200,
    accepted: [],
  },
];

const driverPool = [
  { id: 1, name: "Ravi Kumar", phone: "+91 98989 98989", vehicle: "DL 1AB 2345" },
  { id: 2, name: "Anita Singh", phone: "+91 97979 97979", vehicle: "MH 12 XY 4455" },
];

const impactData = [
  { month: "Jan", meals: 1200, co2: 0.8 },
  { month: "Feb", meals: 2100, co2: 1.2 },
  { month: "Mar", meals: 2800, co2: 1.5 },
  { month: "Apr", meals: 3600, co2: 1.9 },
  { month: "May", meals: 5000, co2: 2.6 },
  { month: "Jun", meals: 6200, co2: 3.1 },
];

// Utility for initials
const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// ---------------------------------------------
// Components
// ---------------------------------------------
function Header({ onSearch }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">XtraSmile</h1>
            <p className="text-xs text-muted-foreground">From Extra Plates to Full Hearts</p>
          </div>
          <Badge variant="secondary" className="ml-2 rounded-full">Beta</Badge>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search donors, NGOs, drivers..."
              className="pl-9 w-[280px]"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-2">
      <Card className="rounded-2xl border-0 bg-gradient-to-br from-emerald-50 to-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-emerald-600" /> Welcome to XtraSmile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700">
            Connect surplus food from <strong>Hotels & Restaurants</strong> to nearby <strong>NGOs & Shelters</strong>.
            Coordinate pickups with volunteers, track deliveries, and see your social & environmental impact.
          </p>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <li className="flex items-center gap-2 text-sm"><Building2 className="h-4 w-4 text-emerald-700"/> Hotel quick post</li>
            <li className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 text-emerald-700"/> Freshness check</li>
            <li className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-emerald-700"/> Smart NGO matching</li>
            <li className="flex items-center gap-2 text-sm"><Truck className="h-4 w-4 text-emerald-700"/> Driver routing</li>
          </ul>
          <div className="flex gap-3 pt-1">
            <Button className="rounded-2xl">Post Surplus</Button>
            <Button variant="outline" className="rounded-2xl">View Nearby Donations</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl"><Gauge className="h-6 w-6 text-emerald-600"/> Impact Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Meals Saved</p>
              <p className="text-2xl font-semibold">6,200</p>
              <Progress value={72} className="mt-2" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">NGOs Served</p>
              <p className="text-2xl font-semibold">37</p>
              <Progress value={54} className="mt-2" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">CO₂ Avoided (t)</p>
              <p className="text-2xl font-semibold">3.1</p>
              <Progress value={61} className="mt-2" />
            </div>
          </div>
          <div className="mt-4 h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="meals" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function DonorPortal({ hotels, onPost }) {
  const [form, setForm] = useState({ name: "", item: "", qty: "", hours: "", address: "" });
  const [photo, setPhoto] = useState(null);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-8">
      <div className="mb-4 flex items-center gap-2">
        <Utensils className="h-5 w-5 text-emerald-700" />
        <h2 className="text-lg font-semibold">Hotel/Restaurant – Quick Post</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Post Surplus Food</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label>Hotel/Restaurant Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., Hotel Nirvana" />
            </div>
            <div className="grid gap-3">
              <Label>Food Item</Label>
              <Input value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} placeholder="e.g., Veg Pulao" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label>Quantity (servings)</Label>
                <Input type="number" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
              </div>
              <div className="grid gap-3">
                <Label>Best Before (hours)</Label>
                <Input type="number" value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Pickup Address</Label>
              <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, City" />
            </div>
            <div className="grid gap-3">
              <Label>Photo (optional)</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-xl" type="button">
                  <Camera className="mr-2 h-4 w-4" /> Use Camera
                </Button>
                <Button variant="outline" className="rounded-xl" type="button">
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
              </div>
            </div>
            <Button className="w-full rounded-2xl" onClick={() => onPost?.(form)}>Submit Surplus</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Hotel Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {hotels.map((h) => (
              <div key={h.id} className="flex items-start gap-3 rounded-2xl border p-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{initials(h.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{h.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3"/> {h.address}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {h.surplus.map((s) => (
                      <Badge key={s.id} variant="secondary" className="rounded-xl">
                        {s.item} · {s.qty} servings · {s.bestBeforeHrs}h
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button size="sm" className="rounded-xl" variant="outline">Details</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function NGOPortal({ hotels, ngos, onAccept }) {
  const available = useMemo(
    () =>
      hotels.flatMap((h) =>
        h.surplus.map((s) => ({
          hotelId: h.id,
          hotel: h.name,
          address: h.address,
          contact: h.contact,
          ...s,
        }))
      ),
    [hotels]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pb-8">
      <div className="mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-emerald-700" />
        <h2 className="text-lg font-semibold">NGO – Nearby Donations</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Available Surplus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {available.map((a) => (
              <div key={`${a.hotelId}-${a.id}`} className="rounded-2xl border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{a.item} · {a.qty} servings</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Building2 className="h-3 w-3"/> {a.hotel}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3"/> {a.address}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3"/> {a.contact}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs">Best before</p>
                    <p className="text-sm font-semibold">{a.bestBeforeHrs} hrs</p>
                    <Button size="sm" className="mt-2 rounded-xl" onClick={() => onAccept?.(a)}>Accept</Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Partner NGOs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ngos.map((n) => (
              <div key={n.id} className="flex items-center justify-between rounded-2xl border p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9"><AvatarFallback>{initials(n.name)}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-medium">{n.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3"/> {n.address}</p>
                  </div>
                </div>
                <Badge className="rounded-xl" variant="secondary">Capacity: {n.capacity}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function DriverPortal({ tasks, onStatus }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8">
      <div className="mb-4 flex items-center gap-2">
        <Truck className="h-5 w-5 text-emerald-700" />
        <h2 className="text-lg font-semibold">Driver – Pickup Tasks</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {tasks.length === 0 && (
          <Card className="rounded-2xl">
            <CardContent className="py-8 text-center text-sm text-muted-foreground">No tasks assigned yet.</CardContent>
          </Card>
        )}
        {tasks.map((t) => (
          <Card key={t.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>#{t.id} • {t.item} ({t.qty})</span>
                <Badge className="rounded-xl" variant="secondary">{t.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="font-medium">Pickup</p>
                  <p className="text-muted-foreground">{t.pickup}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="font-medium">Drop</p>
                  <p className="text-muted-foreground">{t.drop}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4"/> ~{t.distanceKm} km • ETA {t.etaMin} min</div>
              <div className="flex gap-2">
                <Button size="sm" className="rounded-xl" variant="outline" onClick={() => onStatus?.(t.id, "Picked Up")}>Picked Up</Button>
                <Button size="sm" className="rounded-xl" onClick={() => onStatus?.(t.id, "Delivered")}>Delivered</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function AdminDashboard({ hotels, ngos }) {
  const totals = useMemo(() => {
    const meals = hotels.reduce((acc, h) => acc + h.surplus.reduce((a, s) => a + s.qty, 0), 0);
    const co2 = (meals / 2000) * 1.0; // playful calc for demo
    return { meals, co2: Number(co2.toFixed(2)), donors: hotels.length, ngos: ngos.length };
  }, [hotels, ngos]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12">
      <div className="mb-4 flex items-center gap-2">
        <LayoutDashboard className="h-5 w-5 text-emerald-700" />
        <h2 className="text-lg font-semibold">Admin – Impact & Analytics</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Meals (surplus)</p>
            <p className="text-2xl font-semibold">{totals.meals}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">CO₂ Avoided (t)</p>
            <p className="text-2xl font-semibold">{totals.co2}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Donors</p>
            <p className="text-2xl font-semibold">{totals.donors}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">NGOs</p>
            <p className="text-2xl font-semibold">{totals.ngos}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Meals Saved by Month</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="meals" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>CO₂ Avoided Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="co2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-2xl border-dashed">
        <CardContent className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm font-medium">Top Donor: Hotel Nirvana</p>
              <p className="text-xs text-muted-foreground">1,240 servings contributed</p>
            </div>
          </div>
          <Badge className="rounded-xl" variant="secondary">Gamified Badges</Badge>
        </CardContent>
      </Card>
    </section>
  );
}

export default function App() {
  const [hotels, setHotels] = useState(seedHotels);
  const [ngos, setNGOs] = useState(seedNGOs);
  const [driverTasks, setDriverTasks] = useState([
    {
      id: 101,
      item: "Veg Biryani",
      qty: 20,
      pickup: "Hotel Nirvana, Connaught Place",
      drop: "Helping Hands, Lajpat Nagar",
      distanceKm: 6.2,
      etaMin: 18,
      status: "Assigned",
    },
  ]);
  const [query, setQuery] = useState("");
  const [darkMinimal, setDarkMinimal] = useState(false);

  const filteredHotels = useMemo(() => {
    if (!query) return hotels;
    return hotels.filter((h) => h.name.toLowerCase().includes(query.toLowerCase()));
  }, [hotels, query]);

  function handlePostSurplus(form) {
    if (!form?.name || !form?.item) return alert("Please fill required fields (name + item)");
    const exists = hotels.find((h) => h.name.toLowerCase() === form.name.toLowerCase());
    const newEntry = { id: crypto.randomUUID(), item: form.item, qty: Number(form.qty || 10), bestBeforeHrs: Number(form.hours || 4) };
    if (exists) {
      const updated = hotels.map((h) => (h.id === exists.id ? { ...h, surplus: [...h.surplus, newEntry] } : h));
      setHotels(updated);
    } else {
      setHotels([
        ...hotels,
        {
          id: Math.max(...hotels.map((h) => h.id)) + 1,
          name: form.name,
          contact: "+91 90000 00000",
          address: form.address || "",
          surplus: [newEntry],
        },
      ]);
    }
    alert("Surplus posted! (mock)");
  }

  function handleAccept(a) {
    // Assign a driver task and mark NGO acceptance (mock only)
    setDriverTasks((prev) => [
      ...prev,
      {
        id: Math.floor(Math.random() * 1000) + 200,
        item: a.item,
        qty: a.qty,
        pickup: `${a.hotel}, ${a.address}`,
        drop: "Nearest NGO (auto)",
        distanceKm: (Math.random() * 8 + 2).toFixed(1),
        etaMin: Math.floor(Math.random() * 20) + 10,
        status: "Assigned",
      },
    ]);
    alert(`Accepted ${a.item} from ${a.hotel} (mock)`);
  }

  function handleTaskStatus(id, status) {
    setDriverTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  return (
    <div className={"min-h-screen w-full " + (darkMinimal ? "bg-neutral-900 text-neutral-100" : "bg-white text-neutral-900") }>
      <Header onSearch={setQuery} />

      <main className="mx-auto max-w-7xl">
        <Hero />

        <div className="flex items-center justify-between px-4 pb-2">
          <Tabs defaultValue="donor" className="w-full">
            <TabsList className="mb-4 grid grid-cols-4 rounded-2xl">
              <TabsTrigger value="donor" className="rounded-xl"><Building2 className="mr-2 h-4 w-4"/> Donor</TabsTrigger>
              <TabsTrigger value="ngo" className="rounded-xl"><Heart className="mr-2 h-4 w-4"/> NGO</TabsTrigger>
              <TabsTrigger value="driver" className="rounded-xl"><Truck className="mr-2 h-4 w-4"/> Driver</TabsTrigger>
              <TabsTrigger value="admin" className="rounded-xl"><LayoutDashboard className="mr-2 h-4 w-4"/> Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="donor"><DonorPortal hotels={filteredHotels} onPost={handlePostSurplus} /></TabsContent>
            <TabsContent value="ngo"><NGOPortal hotels={filteredHotels} ngos={ngos} onAccept={handleAccept} /></TabsContent>
            <TabsContent value="driver"><DriverPortal tasks={driverTasks} onStatus={handleTaskStatus} /></TabsContent>
            <TabsContent value="admin"><AdminDashboard hotels={filteredHotels} ngos={ngos} /></TabsContent>
          </Tabs>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pb-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Leaf className="h-4 w-4"/> Built for hackathon demo • Frontend only</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Minimal mode</span>
            <Switch checked={darkMinimal} onCheckedChange={setDarkMinimal} />
          </div>
        </div>
      </main>
    </div>
  );
}
