using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;

namespace dotTestApiServer.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class TestController : ControllerBase
  {
    public MySqlConnection m_mySqlConnection = null;
    public readonly String m_connectionInfo = @"Server=127.0.0.1;Database=django_shopping;Uid=root;Charset=utf8";

    public readonly String m_test_query = "SELECT * FROM `django_shopping`.`shopping_django_userinfo` ORDER BY `id` LIMIT 300 OFFSET 0";

    public TestController() {}

    private readonly ILogger<TestController> _logger;

    [HttpPost]
    public int Post()
    { 
      return 10;
    }

    [HttpGet]
    public List<Int32> Get()
    {
      List<Int32> list = new List<Int32>();
      for (int i = 0 ; i < 10 ; ++i) {
        list.Add(i);
      }
      
      return list;
    }

    [HttpGet("user_infos")]
    public List<String> GetUserInfos()
    {
      List<String> return_arr = new List<String>();
      m_mySqlConnection = new MySqlConnection();
      m_mySqlConnection.ConnectionString = m_connectionInfo;
      try
      {
        m_mySqlConnection.Open();

        MySqlCommand sqlCommand = m_mySqlConnection.CreateCommand();
        sqlCommand.CommandText = m_test_query;
        MySqlDataReader reader = sqlCommand.ExecuteReader();

        while (reader.Read()) {
          String value = String.Format("{0}", reader["nickname"]);
          return_arr.Add(value);
        }

        m_mySqlConnection.Close();

        return return_arr;
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
      }
      return return_arr;
    }
  }
}