import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomers, getOrders } from "@/lib/airtable";
import { 
  Users, 
  Package, 
  DollarSign, 
  ShoppingBag,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const Admin = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalSales: 0,
    totalProducts: 4,
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  useEffect(() => {
    if (isAuthenticated && user?.fields?.Username === "admincontrol@5678") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    if (!isAdmin) {
      navigate("/profile");
      return;
    }

    const fetchData = async () => {
      try {
        const customersResponse = await getCustomers();
        const customers = customersResponse.records || [];
        
        const ordersResponse = await getOrders();
        const orders = ordersResponse.records || [];
        
        let totalSales = 0;
        orders.forEach(order => {
          if (order.fields?.TotalAmount) {
            totalSales += order.fields.TotalAmount;
          }
        });
        
        setStats({
          totalCustomers: customers.length,
          totalOrders: orders.length,
          totalSales,
          totalProducts: 4,
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading admin dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-screen bg-white border-r transition-all duration-300 z-50",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold">Admin Panel</h1>
          ) : (
            <h1 className="text-xl font-bold">AP</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              isSidebarOpen ? "px-4" : "px-2"
            )}
            onClick={() => navigate("/admin")}
          >
            <LayoutDashboard className="h-5 w-5" />
            {isSidebarOpen && <span>Dashboard</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              isSidebarOpen ? "px-4" : "px-2"
            )}
            onClick={() => navigate("/admin/customers")}
          >
            <Users className="h-5 w-5" />
            {isSidebarOpen && <span>Customers</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              isSidebarOpen ? "px-4" : "px-2"
            )}
            onClick={() => navigate("/admin/orders")}
          >
            <Package className="h-5 w-5" />
            {isSidebarOpen && <span>Orders</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              isSidebarOpen ? "px-4" : "px-2"
            )}
            onClick={() => navigate("/admin/products")}
          >
            <ShoppingBag className="h-5 w-5" />
            {isSidebarOpen && <span>Products</span>}
          </Button>
          
          <Separator className="my-4" />
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              isSidebarOpen ? "px-4" : "px-2"
            )}
            onClick={() => navigate("/admin/settings")}
          >
            <Settings className="h-5 w-5" />
            {isSidebarOpen && <span>Settings</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50",
              isSidebarOpen ? "px-4" : "px-2"
            )}
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Sales
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.totalSales.toFixed(2)}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Products
                  </CardTitle>
                  <ShoppingBag className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start gap-2" asChild>
                    <Link to="/admin/customers">
                      <Users className="h-4 w-4" />
                      Manage Customers
                    </Link>
                  </Button>
                  <Button className="w-full justify-start gap-2" asChild>
                    <Link to="/admin/orders">
                      <Package className="h-4 w-4" />
                      Manage Orders
                    </Link>
                  </Button>
                  <Button className="w-full justify-start gap-2" asChild>
                    <Link to="/admin/products">
                      <ShoppingBag className="h-4 w-4" />
                      Manage Products
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Database Connection</span>
                    <span className="text-sm font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">API Status</span>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Last Sync</span>
                    <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
